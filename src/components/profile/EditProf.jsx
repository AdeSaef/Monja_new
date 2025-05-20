import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImCross } from "react-icons/im";
import { HiMiniPencil } from "react-icons/hi2";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import {
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../../services/profileService";
import default_profile from "../../assets/sample_profile_picture.jpeg";

const EditProfile = ({
  iseditDetailProfile,
  toggleeditDetailProfile,
  imgprofile,
}) => {
  // State untuk menyimpan nama, nomor HP, alamat, dan data form
  const [formData, setFormData] = useState({
    newName: "",
    newPhoneNumber: "",
    newAddress: "",
  });
  const navigate = useNavigate();
  const [editDetailMode, seteditDetailMode] = useState(false);
  const [editMode, seteditMode] = useState(false);

  const [dataProfile, setDataProfile] = useState({
    name: "",
    phoneNumber: "",
    guid: "",
    email: "",
    role: "",
    address: "",
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
            address: profileData.user.address,
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
      // console.log(response);
      // console.log(formData);
      if (response.data.success) {
        alert(response.data.message);
        seteditDetailMode(false);
      } else {
        alert("Gagal mengubah profile. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };

  const editSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitEdit = await updateProfile(formData);
      // console.log(formData);
      // console.log(submitEdit);
      if (submitEdit.data.success) {
        alert(submitEdit.data.message);
        seteditMode(false);
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

  const editDetailProfile = () => {
    seteditMode(false);
    seteditDetailMode((prev) => !prev);
  };

  const editProfile = () => {
    seteditDetailMode(false);
    seteditMode((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className={`w-full h-full flex flex-col select-none `}>
      <div className="rounded-tl-none w-auto h-screen p-14 bg-zinc-700">
        <div className="w-full h-auto bg-white rounded-lg flex p-2">
          <div className="w-44 h-20 overflow-hidden flex justify-center rounded-full border-2 border-black items-center bg-white relative">
            <img
              src={imageProfile}
              alt="Profile"
              className="w-full h-full  object-cover select-none cursor-pointer"
              onClick={triggerFileInput}
            />
            <input
              type="file"
              id="fileInput"
              className="absolute top-0 right-0 w-full h-full hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex flex-col justify-center w-full p-2">
            {editMode ? (
              <>
                <label htmlFor="newName" className="text-gray-500 font-bold">
                  Nama
                </label>
                <input
                  id="newName"
                  name="newName"
                  type="text"
                  className="border border-gray-300 rounded px-2 mb-2"
                  value={formData.newName}
                  onChange={handleChange}
                />

                <label htmlFor="newAddress" className="text-gray-500 font-bold">
                  Alamat
                </label>
                <textarea
                  id="newAddress"
                  name="newAddress"
                  className="border border-gray-300 rounded px-2"
                  value={formData.newAddress}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <p className="font-bold">{dataProfile.name}</p>
                <p className="text-sm">{dataProfile.address}</p>
              </>
            )}
          </div>
          <div className="w-full flex justify-end">
            <div className="flex flex-col justify-center">
              <motion.div
                className="w-20 flex justify-between border border-black rounded-full overflow-hidden"
                animate={{
                  backgroundColor: editMode ? "#000000" : "#ffffff", // Perubahan background color
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.2,
                }}
              >
                <AnimatePresence Mode="wait">
                  {editMode ? (
                    <motion.div
                      className="w-full h-full p-0.5 rounded-full flex cursor-pointer"
                      onClick={editSubmit}
                    >
                      {/* Ikon dan Teks Simpan */}
                      <motion.div
                        className="w-4 h-4 flex flex-col justify-center rounded-full bg-white p-1 mr-1"
                        key="saveIcon"
                        initial={{ x: 80 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaSave className="w-full h-full text-black" />
                      </motion.div>
                      <motion.p
                        className="text-xs text-center text-white w-3/4 whitespace-nowrap"
                        key="saveText"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          opacity: { duration: 0.3, delay: 0.5 },
                        }}
                      >
                        Simpan
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="w-full h-full p-0.5 rounded-full flex cursor-pointer"
                      onClick={editProfile}
                    >
                      {/* Teks dan Ikon Edit */}
                      <motion.p
                        className="text-xs text-center w-3/4 whitespace-nowrap"
                        key="editText"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          opacity: { duration: 0.3, delay: 0.5 },
                        }}
                      >
                        Edit Data
                      </motion.p>

                      <motion.div
                        className="w-4 h-4 flex flex-col justify-center rounded-full bg-black p-1 ml-1"
                        key="editIcon"
                        initial={{ x: -80 }}
                        animate={{ x: 0 }}
                        exit={{ x: -80 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HiMiniPencil className="w-full h-full text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto bg-white rounded-3xl flex mt-8 px-4">
          {!editDetailMode ? (
            <div className="flex flex-col p-2">
              <p className="font-bold my-1">Profile</p>
              <p className="text-gray-500">Nama</p>
              <p className="text-gray-500 mb-2">{dataProfile.name}</p>
              <p className="text-gray-500">Nomor Hp</p>
              <p className="text-gray-500 mb-2">{dataProfile.phoneNumber}</p>
              <p className="text-gray-500">Email</p>
              <p className="text-gray-500 mb-2">{dataProfile.email}</p>
              <p className="text-gray-500">Alamat</p>
              <p className="text-gray-500 mb-2">{dataProfile.address}</p>
            </div>
          ) : (
            <div className="flex flex-col p-2">
              <p className="font-bold my-1">Profile</p>

              <label htmlFor="newName" className="text-gray-500">
                Nama
              </label>
              <input
                id="newName"
                name="newName"
                type="text"
                className="border border-gray-300 rounded px-2"
                value={formData.newName}
                onChange={handleChange}
              />

              <label htmlFor="newPhoneNumber" className="text-gray-500">
                Nomor Hp
              </label>
              <input
                id="newPhoneNumber"
                name="newPhoneNumber"
                type="text"
                className="border border-gray-300 rounded px-2"
                value={formData.newPhoneNumber}
                onChange={handleChange}
              />

              <label htmlFor="email" className="text-gray-500">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border border-gray-300 rounded px-2 py-1 bg-gray-100 text-gray-500 cursor-not-allowed select-none"
                value={dataProfile.email}
                disabled
              />

              <label htmlFor="newAddress" className="text-gray-500">
                Alamat
              </label>
              <textarea
                id="newAddress"
                name="newAddress"
                className="border border-gray-300 rounded px-2"
                value={formData.newAddress}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="w-full flex justify-end">
            <div className="flex flex-col justify-center">
              <motion.div
                className="w-20 flex justify-between border border-black rounded-full overflow-hidden"
                animate={{
                  backgroundColor: editDetailMode ? "#000000" : "#ffffff", // Perubahan background color
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.2,
                }}
              >
                {/* Tampilkan Elemen Tergantung editDetailMode */}
                <AnimatePresence Mode="wait">
                  {editDetailMode ? (
                    <motion.div
                      className="w-full h-full p-0.5 rounded-full flex cursor-pointer"
                      onClick={handleSubmit}
                    >
                      {/* Ikon dan Teks Simpan */}
                      <motion.div
                        className="w-4 h-4 flex flex-col justify-center rounded-full bg-white p-1 mr-1"
                        key="saveIcon"
                        initial={{ x: 80 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaSave className="w-full h-full text-black" />
                      </motion.div>
                      <motion.p
                        className="text-xs text-center text-white w-3/4 whitespace-nowrap"
                        key="saveText"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          opacity: { duration: 0.3, delay: 0.5 },
                        }}
                      >
                        Simpan
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="w-full h-full p-0.5 rounded-full flex cursor-pointer"
                      onClick={editDetailProfile}
                    >
                      {/* Teks dan Ikon Edit */}
                      <motion.p
                        className="text-xs text-center w-3/4 whitespace-nowrap"
                        key="editText"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          opacity: { duration: 0.3, delay: 0.5 },
                        }}
                      >
                        Edit Data
                      </motion.p>

                      <motion.div
                        className="w-4 h-4 flex flex-col justify-center rounded-full bg-black p-1 ml-1"
                        key="editIcon"
                        initial={{ x: -80 }}
                        animate={{ x: 0 }}
                        exit={{ x: -80 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HiMiniPencil className="w-full h-full text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex justify-center my-5">
          <button
            className="bg-red-700 rounded-lg px-5 text-lg text-white"
            onClick={handleLogout}
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
