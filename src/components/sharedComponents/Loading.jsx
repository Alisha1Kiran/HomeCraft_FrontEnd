import React from 'react'

const Loading = () => {
  return (
    <>
        <div className="fixed inset-0 flex justify-center items-center bg-white/80 z-50">
          <div className="flex gap-2 text-blue-500">
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        </div>
    </>
  )
}

export default Loading