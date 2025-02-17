import React, { forwardRef } from "react";

const DynamicTextField = forwardRef(({ label, type = "text", value, onChange, ...props }, ref) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium capitalize">{label}</label>
      <input
        ref={ref}
        type={type}
        value={value || ""}
        onChange={onChange}
        {...props}
        className="input input-bordered w-full"
      />
    </div>
  );
});

export default DynamicTextField;
