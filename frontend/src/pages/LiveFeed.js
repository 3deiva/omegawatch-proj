import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import video from "../assets/SampleVideo_720x480_1mb.mp4";

function LiveFeed() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStart = () => {
    setIsStreaming(true);
  };

  const handleStop = () => {
    setIsStreaming(false);
    setShowPopup(true); // Show popup on stop
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close popup
  };

  const handleHomeRedirect = () => {
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="flex h-screen">
      {!isStreaming ? (
        <div className="flex flex-col justify-center items-center w-full mt-[-10%]">
          <h1 className="text-2xl font-bold mb-4">Live Drone Feed</h1>
          <div className="button-container flex flex-col space-y-4">
            <button
              onClick={handleStart}
              className="start-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Start
            </button>
            <button
              onClick={handleStop}
              className="stop-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Stop
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="sidebar bg-gray-800 text-white p-4 flex flex-col justify-center items-center md:w-64 w-full">
            <h1 className="text-2xl font-bold mb-4">Live Drone Feed</h1>
            <div className="button-container flex flex-col space-y-4">
              <button
                onClick={handleStart}
                className="start-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Start
              </button>
              <button
                onClick={handleStop}
                className="stop-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Stop
              </button>
            </div>
          </div>
          <div className="content flex-1 p-4 h-screen md:ml-64">
            {isStreaming && (
              <div className="video-container w-full h-full">
                <video
                  src={video}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Stream Stopped</h2>
            <p className="mb-4">Visit the link below for more details:</p>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mb-4 block"
            >
              Go to Dashboard
            </a>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleClosePopup}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={handleHomeRedirect}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveFeed;
