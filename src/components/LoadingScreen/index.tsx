import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="loader" />
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
