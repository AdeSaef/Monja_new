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

  const [dataProfile, setDetail] = useState({
    name: "",
    phoneNumber: "",
    guid: "",
    email: "",
    role: "",
    guidAplication: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        if (profileData) {
          setDetail({
            newName: profileData.user.name,
            newPhoneNumber: profileData.user.phoneNumber,
            guid: profileData.user.guid,
            email: profileData.user.email,
            role: profileData.user.applications[0].role,
            guidAplication: profileData.user.applications[0].guidAplication,
            imageProfile: profileData.user.imageProfile,
          });
          setFormData({
            name: profileData.user.name,
            phoneNumber: profileData.user.phoneNumber,
            guid: profileData.user.guid,
            email: profileData.user.email,
            role: profileData.user.applications.role,
            guidAplication: profileData.user.applications.guidAplication,
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
      className={`w-auto h-auto absolute top-0 left-0 flex flex-col select-none transition-opacity duration-500 ${
        isDetailProfile ? "opacity-100" : "opacity-0 hidden"
      }`}
    >
      <div className="flex bg-gray-400 rounded-t-xl w-32 text-center text-white whitespace-nowrap mx-auto">
        <p className="text-lg mx-auto PX-2">ATUR PROFILE</p>
      </div>
      <div className="bg-gray-400 rounded-xl rounded-tl-none w-auto h-auto pt-0 pl-3 pr-6 ">
        <ImCross
          className="text-white my-auto mx-1 cursor-pointer mt-2"
          onClick={toggleDetailProfile}
        />
        <div className="w-24 h-24 mx-auto mt-2 rounded-full border-4 border-white overflow-hidden select-none flex items-center">
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
        <form onSubmit={handleSubmit}>
          {[
            { field: "guid", label: "GUID", disabled: true },
            { field: "name", label: "Name", disabled: false },
            { field: "email", label: "Email", disabled: true },
            {
              field: "guidAplication",
              label: "GUID Application",
              disabled: true,
            },
            { field: "role", label: "Role", disabled: true },
            { field: "phoneNumber", label: "Phone Number", disabled: false },
          ].map(({ field, label, disabled }) => (
            <div className="flex flex-col mb-2" key={field}>
              <label className="text-white mx-1 text-xs">{label}</label>
              <input
                type="text"
                className="rounded-md w-64 p-1"
                name={field}
                value={dataProfile[field] || ""}
                placeholder={label}
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          ))}
          <div className="flex justify-end my-3">
            <button
              className="bg-yellow-400 text-center text-sm text-white rounded-md px-2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailProfile;
