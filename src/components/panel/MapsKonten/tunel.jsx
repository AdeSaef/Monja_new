import React from "react";

const Tunel = ({ismapsOpen, isHidden, buttonPanel}) => {
  return (
    <div
      className={`bg-blue-500 rounded-t-lg mb-1 w-full text-white text-center cursor-pointer select-none ${
        ismapsOpen ? "hidden" : ""
      }`}
      onClick={buttonPanel}
    >
      {isHidden ? "Buka Panel" : "Tutup Panel"}
    </div>
  );
};

export default Tunel;