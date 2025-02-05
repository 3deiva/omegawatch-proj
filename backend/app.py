from flask import Flask, Response
from flask_cors import CORS
import cv2
import time
from threading import Lock
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
ip_address = "http://192.168.137.205:8080/video"
reconnection_timeout = 5  # seconds
frame_interval = 0.03    # seconds
frames_folder = "captured_frames"  # Folder to store captured frames

# Create frames folder if it doesn't exist
os.makedirs(frames_folder, exist_ok=True)

# Global variables
camera_lock = Lock()
last_frame = None
is_capturing = False

def create_capture():
    cap = cv2.VideoCapture(ip_address)
    if not cap.isOpened():
        cap.open(ip_address)
    return cap

def save_frame(frame):
    """Save frame with timestamp as filename"""
    try:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
        filename = os.path.join(frames_folder, f"frame_{timestamp}.jpg")
        cv2.imwrite(filename, frame)
    except Exception as e:
        print(f"Error saving frame: {str(e)}")

def safe_capture(cap):
    global last_frame
    try:
        ret, frame = cap.read()
        if ret:
            last_frame = frame
            return True, frame
        return False, None
    except cv2.error as e:
        print(f"OpenCV error during capture: {str(e)}")
        return False, None
    except Exception as e:
        print(f"Unexpected error during capture: {str(e)}")
        return False, None

def generate():
    global is_capturing
    cap = create_capture()
    last_reconnect_attempt = 0
    
    while True:
        with camera_lock:
            if not is_capturing:
                break
                
            ret, frame = safe_capture(cap)
            
            if not ret:
                current_time = time.time()
                if current_time - last_reconnect_attempt > reconnection_timeout:
                    print("Attempting to reconnect...")
                    cap.release()
                    cap = create_capture()
                    last_reconnect_attempt = current_time
                    continue
                
                if last_frame is not None:
                    frame = last_frame
                else:
                    time.sleep(frame_interval)
                    continue

            try:
                # Save the frame
                save_frame(frame)
                
                # Encode and yield frame for streaming
                ret, buffer = cv2.imencode('.jpg', frame)
                if not ret:
                    continue
                frame_bytes = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n\r\n')
            except Exception as e:
                print(f"Error processing frame: {str(e)}")
                continue

            time.sleep(frame_interval)

@app.route('/video')
def video():
    response = Response(
        generate(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )
    response.headers.update({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    })
    return response

@app.route('/start_camera', methods=['POST'])
def start_camera():
    global is_capturing
    with camera_lock:
        is_capturing = True
    return {"message": "Camera started"}

@app.route('/release_camera', methods=['POST'])
def release_camera():
    global is_capturing
    with camera_lock:
        is_capturing = False
    return {"message": "Camera released"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)