import React from 'react'

const Spinner = () => {
  return (
    <>
      <div className="fixed z-30 inset-0 top-0 l-0 h-screen  bg-gray-500 bg-opacity-80">
        <div className="absolute  right-1/2 bottom-1/2 bg-white transform translate-x-1/2 translate-y-1/2 p-8 rounded-xl">
          <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-32 w-32"></div>
        </div>
      </div>
    </>
  );
}

export default Spinner
