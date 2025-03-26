import React from "react";

function Fallback() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-700 mb-4">
        An unexpected error occurred. Please try refreshing the page.
      </p>
    </div>
  );
}

export default Fallback;
