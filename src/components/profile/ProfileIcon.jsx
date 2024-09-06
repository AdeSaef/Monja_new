import React, { useState } from "react";
import default_profile from "../../assets/sample_profile_picture.jpeg";
import { IoIosSettings } from "react-icons/io";
import { HiMiniPencil } from "react-icons/hi2";

const ProfileIcon = ({
  isProfile,
  toggleEditProfile,
  toggleDetailProfile,
  toggleSetting,
  imgprofile,
}) => {

  const imageProfile = imgprofile || default_profile;



  return (
    <div
      className={`w-auto h-auto absolute top-10 left-10 flex transition-opacity duration-500 ${
        isProfile ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-24 h-24 p-0 rounded-full border-4 border-black overflow-hidden select-none">
        <img
          src={imageProfile}
          alt="Profile"
          className="w-full h-full object-cover select-none cursor-pointer"
          onClick={toggleDetailProfile}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="w-6 h-6 rounded-full bg-black object-contain p-1 cursor-pointer">
          <HiMiniPencil
            className="text-white w-full h-full"
            onClick={toggleEditProfile}
          />
        </div>
        <div className="w-6 h-6 rounded-full bg-black object-contain cursor-pointer">
          <IoIosSettings
            className="text-white w-full h-full"
            onClick={toggleSetting}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
