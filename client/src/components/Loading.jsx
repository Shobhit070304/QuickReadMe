import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>

      {/* Text */}
      <p className="text-lg font-semibold text-white">
        Fetching results, please wait...
      </p>
    </div>
  );
};

export default Loading;
