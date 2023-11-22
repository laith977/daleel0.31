// LoadingSkeleton.js
import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Skeleton height={50} width={200} />
      </div>
      <div className="relative">
        <div className="w-12 h-12 bg-gray-300 rounded-full animate-spin absolute top-0 left-0 right-0 bottom-0 m-auto"></div>
        <div className="mt-4">
          <Skeleton count={5} />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
