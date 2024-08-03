import React from "react";

export default function Loader( {isLoading = true }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ${
        isLoading ? "visible" : "hidden"
      }`}
    >
      {isLoading && (
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid border-r-4 border-gray-200 rounded-full animate-spin"></div>
      )}
   
    </div>
  );
}