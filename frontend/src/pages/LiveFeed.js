import React, { useState } from 'react';

function LiveFeed() {
  const [isStreaming, setIsStreaming] = useState(false);

  const handleStart = () => {
    setIsStreaming(true);
  };

  const handleStop = () => {
    setIsStreaming(false);
  };

  return (
    <div className="flex">
      <div className="sidebar bg-gray-800 text-white p-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Live Drone Feed</h1>
        <div className="button-container flex flex-col space-y-4">
          <button onClick={handleStart} className="start-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Start</button>
          <button onClick={handleStop} className="stop-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Stop</button>
        </div>
      </div>
      <div className="content flex-1 p-4">
        {isStreaming && (
          <div className="video-container">
            <video src="../assets/MA6201 - Google Drive - Google Chrome 2024-05-19 21-38-44.mp4" controls autoPlay className="w-full h-auto" />
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveFeed;