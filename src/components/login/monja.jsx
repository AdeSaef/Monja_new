import React from "react";
import logoMonja from '../../assets/logo/logo_monja.png';

function LogoMonja({ lsize }) {
  return (
    <div className={`${lsize} mb-5 h-auto `}>
      <img src={logoMonja} alt="Logo Monja" className="pointer-events-none" />
    </div>
  );
}

export default LogoMonja;
