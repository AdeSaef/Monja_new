import React from "react";
import logoDPU from "../../assets/logo/logo_dpu.png";
import logoITG from "../../assets/logo/logo_itg.png";
import logoBAPPEDA from "../../assets/logo/logo_bappeda.png";

const Logo = () => {
  return (
    <div className="logo-style">
      <div className="flex flex-wrap mb-4 w-auto h-auto bg-white px-8 py-0 items-center text-white rounded-l-full justify-center">
        <div className="w-1/3 flex justify-center items-center">
          <img
            src={logoBAPPEDA}
            alt="logo bappeda"
            className="h-14 lg:h-20 object-contain"
          />
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <img
            src={logoDPU}
            alt="logo dpu"
            className="h-16 lg:h-20 object-contain"
          />
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <img
            src={logoITG}
            alt="logo itg"
            className="h-12 lg:h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;
