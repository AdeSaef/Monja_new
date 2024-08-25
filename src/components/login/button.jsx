import React from "react";

const Button = ({ textBtn, w = "full", px = 2}) => {
  return (
    <div>
      <button
        type="submit"
        className={`w-${w} mt-7 bg-blue-900 text-white px-${px} py-1 rounded-md hover:bg-blue-700`}
      >
        {textBtn}
      </button>
    </div>
  );
};

export default Button;
