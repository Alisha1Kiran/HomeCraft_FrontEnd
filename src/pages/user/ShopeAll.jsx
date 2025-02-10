import React from "react";

const ShopeAll = () => {
  return (
    <div className="grid grid-cols-1 gap-5">
  {/* Header */}
  <div className="h-20 flex items-center justify-center text-center">
    <h1 className="border-t-4 border-b-4 px-4 py-1 inline-block text-2xl">
      Shop All
    </h1>
  </div>

  {/* Furniture */}
  <div className="relative card lg:card-side bg-base-100 shadow-xl lg:min-h-[180px]">
    <h2 className="glass absolute top-2 left-2 bg-black text-white px-3 py-1 text-sm font-semibold rounded">
      Furniture
    </h2>
    <figure className="w-full h-full lg:w-1/3">
      <img
        src="https://res.cloudinary.com/djthgkd4e/image/upload/v1738576568/banner-1215x1215_1_1_nyhzrx.jpg"
        alt="Furniture"
        className="w-full h-full object-cover"
      />
    </figure>
    <div className="card-body bg-gradient-to-br from-20% to-cyan-600 lg:p-2">
      <h2 className="card-title text-sm lg:text-xs">New album is released!</h2>
      <p className="text-xs lg:text-[10px]">Click the button to listen on Spotiwhy app.</p>
    </div>
  </div>

  {/* Accessories */}
  <div className="relative card lg:card-side bg-base-100 shadow-xl lg:min-h-[180px]">
    <h2 className="glass absolute top-2 left-2 bg-black text-white px-3 py-1 text-sm font-semibold rounded">
      Accessories
    </h2>
    <figure className="w-full h-full lg:w-1/3">
      <img
        src="https://res.cloudinary.com/djthgkd4e/image/upload/v1738578144/Acc_iq3szy.png"
        alt="Accessories"
        className="w-full h-full object-cover"
      />
    </figure>
    <div className="card-body bg-gradient-to-br from-20% to-cyan-600 lg:p-2">
      <h2 className="card-title text-sm lg:text-xs">New album is released!</h2>
      <p className="text-xs lg:text-[10px]">Click the button to listen on Spotiwhy app.</p>
    </div>
  </div>
</div>


  );
};

export default ShopeAll;
