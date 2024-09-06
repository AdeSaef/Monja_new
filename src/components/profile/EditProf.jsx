import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { getProfile, updateProfile } from "../../services/profileService";
// import { updateProfile } from "../../services/profileService";

const EditProfile = ({ isEditProfile, toggleEditProfile }) => {
  // State untuk menyimpan nama, nomor HP, dan data form
  const [formData, setFormData] = useState({
    newName: "",
    newPhoneNumber: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        if (profileData) {
          setFormData({
            newName: profileData.user.name,
            newPhoneNumber: profileData.user.phoneNumber,
            newPassword: "",
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

  const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await updateProfile(formData);

  //     if (response.data.success) {
  //       alert(response.data.message);
  //       navigate("/berhasil");
  //     } else {
  //       alert("Gagal mengubah password. Silakan coba lagi.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Terjadi kesalahan. Silakan coba lagi nanti.");
  //   }
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
      <div className=" bg-gray-400 rounded-xl rounded-tl-none w-auto h-auto pt-0 pl-3 pr-6">
        <form onSubmit={handleSubmit}>
          {[
            { field: "newName", label: "Name" },
            { field: "newPhoneNumber", label: "Phone Number" },
            { field: "newPassword", label: "Password" },
          ].map(({ field, label }) => (
            <div className="flex flex-col mb-2" key={field}>
              <label className="text-white mx-1 text-xs">{label}</label>
              <input
                type={field === "newPassword" ? "password" : "text"}
                className="rounded-md w-64 p-1"
                name={field}
                value={formData[field]}
                placeholder={label}
                onChange={handleChange}
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
