import cv2
from flask import Flask, render_template, Response, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

camera = cv2.VideoCapture(0)

def initialize_camera():
    global camera
    if camera is None or not camera.isOpened():
        camera = cv2.VideoCapture(0)

def generate_frames():
    initialize_camera()
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
        yield(b'--frame\r\n' 
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video')
def video():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/start_camera', methods=['POST']) 
def start_camera():
    initialize_camera()
    return jsonify({"message": "Camera started"})

@app.route('/release_camera', methods=['POST'])
def release_camera():
    if camera is not None and camera.isOpened():
        camera.release()
    return jsonify({"message": "Camera Released"})

if __name__ == '__main__':
    app.run(debug=True)