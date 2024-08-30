import React, { useState } from "react";
import default_profile from "../../assets/sample_profile_picture.jpeg";
import { IoIosSettings } from "react-icons/io";
import { HiMiniPencil } from "react-icons/hi2";
import { uploadProfileImage } from "../../services/profileService";

const ProfileIcon = ({
  isProfile,
  toggleEditProfile,
  toggleSetting,
  imgprofile,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const imageProfile = selectedImage || imgprofile || default_profile;

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setSelectedImage(reader.result);

        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await uploadProfileImage(formData);
          if (response.success) {
            alert("Gambar profil berhasil diupdate!");
          } else {
            alert(response.message);
          }
        } catch (error) {
          alert("Terjadi kesalahan saat mengupload gambar.");
          console.error("Error:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

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
          onClick={triggerFileInput}
        />
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="w-6 h-6 rounded-full bg-black object-contain p-1 z-10 cursor-pointer">
          <HiMiniPencil
            className="text-white w-full h-full"
            onClick={toggleEditProfile}
          />
        </div>
        <div className="w-6 h-6 rounded-full bg-black object-contain z-10 cursor-pointer">
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
