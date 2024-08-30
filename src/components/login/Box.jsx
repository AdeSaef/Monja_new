import React from 'react';
import LogoMonja from "./monja";

const Box = ({ children, lsize = "mx-auto mt-2 w-20 sm:w-24 md:w-28 lg:w-32", ssize = "h-auto px-4 pt-4" }) => {
  return (
    <div className={`container bg-white pb-5 border-4 border-gray-400 rounded-2xl shadow-md non-interactive ${ssize} min-w-64 sm:w-72 md:w-80 lg:w-96 w-max-2xl flex flex-wrap flex-col relative select-none`}>
      <LogoMonja lsize={lsize} />
      {children}
    </div>
  );
};

export default Box;
