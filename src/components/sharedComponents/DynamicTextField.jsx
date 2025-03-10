import React, { forwardRef } from "react";
import {useSelector} from "react-redux"

const DynamicTextField = forwardRef(({ label, type = "text", value, onChange, ...props }, ref) => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div>
      <label className={`block ${theme === "dark" ? "text-white" : "text-gray-700"} text-sm font-medium capitalize`}>{label}</label>
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
