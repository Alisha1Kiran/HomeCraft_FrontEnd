import React, { forwardRef } from "react";

const TextArea = forwardRef(({ label, rows = 4, ...props }, ref) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium capitalize">{label}</label>
      <textarea className="w-full" ref={ref} rows={rows} {...props}></textarea>
    </div>
  );
});

export default TextArea;
