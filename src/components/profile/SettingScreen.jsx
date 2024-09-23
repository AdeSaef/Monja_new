import React from "react";
import { useNavigate } from "react-router-dom";
import default_profile from "../../assets/sample_profile_picture.jpeg";

const SettingScreen = ({ isSetting, imgprofile, username }) => {
  const navigate = useNavigate();
  const updatePassword = () => {
    navigate("/new-password");
  };
  const imageProfile = imgprofile || default_profile;

  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  };
  return (
    <div
      className={`w-60 bg-gray-400 h-auto absolute top-10 left-10 flex flex-col transition-opacity duration-500 ${
        isSetting ? "opacity-100" : "opacity-0 hidden"
      }`}
    >
      <div className="flex m-2">
        <div className="w-16 h-16 p-0 rounded-full border-4 border-white overflow-hidden">
          <img src={imageProfile} alt="Profile" />
        </div>
        <div className="text-white mx-2">
          <p>Hallo!,</p>
          <p>{username.name}</p>
        </div>
      </div>
      {/* <div className="border border-white border-x-0 p-1 text-white">
        Ubah Akun Email
      </div> */}
      <div
        className="border border-white border-x-0 p-1 text-white hover:bg-gray-600 select-none"
        onClick={updatePassword}
      >
        Ubah Password
      </div>
      <div className="flex justify-end p-1">
        <button
          className="bg-red-700 rounded-lg px-2 text-white"
          onClick={handleLogout}
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default SettingScreen;
