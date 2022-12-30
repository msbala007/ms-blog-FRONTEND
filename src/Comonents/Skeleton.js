import React from 'react'

const Skeleton = () => {
  return (
    <>
      <div className="grid-cols-3">
        <div className="w-full h-60 border-2 rounded-2xl mx-auto mt-10">
          <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
            <div className=" bg-gray-300 w-40 h-40 rounded-lg "></div>

            <div className="flex flex-col space-y-3">
              <div className="w-32 bg-gray-300 h-4 rounded-md mb-6 "></div>
              <div className="w-64 bg-gray-300 h-4 rounded-md "></div>
              <div className="w-60 bg-gray-300 h-4 rounded-md "></div>
              <div className="w-32 bg-gray-300 h-4 rounded-md "></div>
            </div>
          </div>
        </div>
        <div className="w-full h-60 border-2 rounded-2xl mx-auto mt-10">
          <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
            <div className=" bg-gray-300 w-40 h-40 rounded-lg "></div>
            <div className="flex flex-col space-y-3">
              <div className="w-32 bg-gray-300 h-4 rounded-md mb-6 "></div>
              <div className="w-64 bg-gray-300 h-4 rounded-md "></div>
              <div className="w-60 bg-gray-300 h-4 rounded-md "></div>
              <div className="w-32 bg-gray-300 h-4 rounded-md "></div>
            </div>
          </div>
        </div>
        <div className="w-full h-60 border-2 rounded-2xl mx-auto mt-10">
          <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
            <div className=" bg-gray-300 w-40 h-40 rounded-lg "></div>
            <div className="flex flex-col space-y-3">
              <div className="w-32 bg-gray-300 h-4 rounded-md mb-6 "></div>
              <div className="w-64 bg-gray-300 h-4 rounded-md "></div>
              <div className="w-60 bg-gray-300 h-4 rounded-md "></div>
              <div className="w-32 bg-gray-300 h-4 rounded-md "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Skeleton