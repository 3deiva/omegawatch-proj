import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LiveFeed() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/start_camera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.message);
      setIsStreaming(true);
      setStreamError(false);
    } catch (err) {
      console.error("Error starting camera: ", err);
      setStreamError(true);
    }
  };

  const handleStop = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/release_camera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.message);
    } catch (err) {
      console.error("Error releasing camera: ", err);
    } finally {
      setIsStreaming(false);
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleHomeRedirect = () => {
    navigate("/");
  };

  useEffect(() => {
    if (isStreaming) {
      const img = new Image();
      img.onerror = () => {
        setStreamError(true);
        console.error("Stream connection lost");
      };
      return () => {
        img.onerror = null;
      };
    }
  }, [isStreaming]);

  return (
    <div className="min-h-screen bg-zinc-50 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-64 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-zinc-900">Live Feed</h1>
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isStreaming ? "bg-green-500 animate-pulse" : "bg-zinc-300"
                  }`}
                ></span>
                <span className="text-sm text-zinc-600">
                  {isStreaming ? "Stream Active" : "Stream Inactive"}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={handleStart}
                className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                  isStreaming
                    ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
                disabled={isStreaming}
              >
                Start Stream
              </button>
              <button
                onClick={handleStop}
                className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                  !isStreaming
                    ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                disabled={!isStreaming}
              >
                Stop Stream
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
            {isStreaming ? (
              <div className="aspect-video relative">
                <img
                  src="http://127.0.0.1:5000/video"
                  alt="Live Stream"
                  className="w-full h-full object-cover"
                />
                {streamError && (
                  <div className="absolute top-4 left-4 right-4 bg-red-500 text-white px-4 py-3 rounded-xl text-center">
                    Stream connection lost. Please try reconnecting.
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-zinc-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-zinc-400 text-xl">
                    Stream is currently offline
                  </div>
                  <div className="text-sm text-zinc-500">
                    Click 'Start Stream' to begin monitoring
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-lg w-96">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">
              Stream Ended
            </h2>
            <p className="text-zinc-600 mb-6">
              Visit the dashboard for detailed analytics:
            </p>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 block mb-6"
            >
              Open Dashboard
            </a>
            <div className="flex space-x-4">
              <button
                onClick={handleClosePopup}
                className="flex-1 px-6 py-3 bg-zinc-100 text-zinc-900 rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleHomeRedirect}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
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
