import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { getProfile, updateProfile } from "../../services/profileService";
import { uploadProfileImage } from "../../services/profileService";
import default_profile from "../../assets/sample_profile_picture.jpeg";

const DetailProfile = ({
  isDetailProfile,
  toggleDetailProfile,
  imgprofile,
}) => {
  // State untuk menyimpan nama, nomor HP, dan data form
  const [formData, setFormData] = useState({
    newName: "",
    newPhoneNumber: "",
  });

  const [dataProfile, setDataProfile] = useState({
    name: "",
    phoneNumber: "",
    guid: "",
    email: "",
    role: "",
    guidAplication: "",
    imageProfile: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        if (profileData) {
          setDataProfile({
            name: profileData.user.name,
            phoneNumber: profileData.user.phoneNumber,
            guid: profileData.user.guid,
            email: profileData.user.email,
            role: profileData.user.applications.role,
            guidAplication: profileData.user.applications.guidAplication,
            imageProfile: profileData.user.imageProfile,
          });
          setFormData({
            newName: profileData.user.name,
            newPhoneNumber: profileData.user.phoneNumber,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(formData);
      if (response.data.success) {
        alert(response.data.message);
        // navigate("/berhasil");
      } else {
        alert("Gagal mengubah profile. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };

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
      className={`w-screen h-screen z-50 absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-500 ${
        isDetailProfile ? "opacity-100" : "opacity-0 hidden"
      }`}
    >
      <ImCross
        className="text-white absolute top-8 left-8 cursor-pointer text-2xl"
        onClick={toggleDetailProfile}
      />
      <div className="relative">
        <div className="w-1/3 h-auto mx-auto overflow-hidden select-none flex items-center">
          <img
            src={imageProfile}
            alt="Profile"
            className="w-full h-full object-cover select-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;
