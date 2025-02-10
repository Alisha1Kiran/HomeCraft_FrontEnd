import React, { forwardRef } from "react";

const TextField = forwardRef(({ label, ...props }, ref) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium capitalize">{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
});

export default TextField;
