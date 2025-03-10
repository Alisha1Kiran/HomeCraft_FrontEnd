import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

const TextArea = forwardRef(({ label, rows = 4, ...props }, ref) => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div>
      <label className={`block ${theme === "dark" ? "text-white" : "text-gray-700"} text-sm font-medium capitalize`}>{label}</label>
      <textarea className="w-full" ref={ref} rows={rows} {...props}></textarea>
    </div>
  );
});

export default TextArea;
