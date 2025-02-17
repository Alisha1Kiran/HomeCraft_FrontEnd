import React from "react";

const Dropdown = ({ label, value, onChange, options, loading, ...props }) => {
  // Ensure options is always an array (fallback to empty array if it's not an array)
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div>
      <label className="block text-white text-sm font-medium capitalize">{label}</label>
      {/* {loading ? (
        <div>Loading...</div>
      ) : ( */}
        <select value={value} onChange={onChange} {...props} className="bg-gray-400">
          <option value="">Select {label}</option>
          {safeOptions.length > 0 ? (
            safeOptions.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))
          ) : (
            <option disabled>No options available</option>
          )}
        </select>
      {/* )} */}
    </div>
  );
};

export default Dropdown;
