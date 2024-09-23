import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { getProfile, updateProfile, uploadProfileImage } from "../../services/profileService";
import default_profile from "../../assets/sample_profile_picture.jpeg";

const EditProfile = ({ isEditProfile, toggleEditProfile, imgprofile }) => {
  // State untuk menyimpan nama, nomor HP, alamat, dan data form
  const [formData, setFormData] = useState({
    newName: "",
    newPhoneNumber: "",
    newAddress: "",
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
            newAddress: profileData.user.address,
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
        isEditProfile ? "opacity-100" : "opacity-0 hidden"
      }`}
    >
      <div className="flex bg-gray-400 rounded-tr-xl w-36 text-center text-white whitespace-nowrap">
        <ImCross
          className="text-white my-auto mx-1 cursor-pointer"
          onClick={toggleEditProfile}
        />
        <p className="mx-auto text-lg">ATUR PROFILE</p>
      </div>
      <div className="bg-gray-400 rounded-xl rounded-tl-none w-auto h-auto pt-0 pl-3 pr-6">
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
            { field: "newName", label: "Name" },
            { field: "newPhoneNumber", label: "Phone Number" },
            { field: "newAddress", label: "Address" },
            { field: "email", label: "Email", disabled: true }, // Tambahkan input email yang dinonaktifkan
          ].map(({ field, label, disabled }) => (
            <div className="flex flex-col mb-2" key={field}>
              <label className="text-white mx-1 text-xs">{label}</label>
              <input
                type="text"
                className="rounded-md w-64 p-1"
                name={field}
                value={formData[field] || dataProfile[field] || ""}
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

export default EditProfile;
