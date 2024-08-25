import React, { useState, useEffect } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import { getProfile, updatePassword } from "../../services/profileService";

const NewPassword = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        const userEmail = profileData.user.email;
        setEmail(userEmail);
        setFormData((prevData) => ({
          ...prevData,
          email: userEmail,
        }));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await updatePassword(formData);

      if (response.data.success) {
        alert(response.data.message);
        navigate("/berhasil");
      } else {
        alert("Gagal mengubah password. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-96 relative">
      <p className="mb-2">Monja meminta data kepada Anda untuk mereset password</p>
      <p>
        Email:
        <span className="border-2 px-1 border-black rounded-md">{Email}</span>
      </p>
      <p className="mb-4">
        Kami mengirimkan kode verifikasi untuk memastikan bahwa yang mengirimkan data benar-benar Anda.
      </p>
      <div className="mb-4">
        <label htmlFor="currentPassword" className="block text-sm mb-2">
          Masukkan Password Saat Ini
        </label>
        <input
          type="password"
          className="flex h-10 w-full p-2 mb-2 rounded-lg border-2 border-black items-center"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <label htmlFor="newPassword" className="block text-sm mb-2">
          Masukkan Password Baru
        </label>
        <input
          type="password"
          className="flex h-10 w-full p-2 mb-2 rounded-lg border-2 border-black items-center"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-end mb-4">
        <a
          href="/forgot-password"
          className="text-sm text-blue-500 hover:underline"
        >
          Ini bukan akun saya
        </a>
      </div>
      <div className="mt-4 flex justify-end">
        <Button textBtn="Reset Password" w="auto" px={8} />
      </div>
    </form>
  );
};

export default NewPassword;
