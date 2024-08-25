import React from "react";

const InputField = ({ id, type, placeholder, value, onChange, icon }) => {
  return (
    <div className="mb-4">
      <div className="flex h-10 rounded-lg border-2 border-black items-center h-10">
        <div className="flex flex-col p-3 w-12 h-12 md:w-14 lg:w-10">
          {icon}
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border-l-2 h-full border-black bg-transparent w-full px-1 py-1 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default InputField;
