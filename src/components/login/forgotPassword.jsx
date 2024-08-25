import React, { useState } from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/axios";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userApi.post("/users/forgot-password", formData);

      if (response.data.success) {
        navigate("/login");
        alert(response.data.message);
      } else {
        alert("Gagal mengirim email reset password. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-96">
      <p className="mb-2">
        Monja meminta data kepada Anda untuk mereset password
      </p>
      <p className="mb-4">
        Masukan email yang digunakan sebagai akun Monja untuk memverifikasi
        bahwa benar ini adalah akun anda
      </p>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm mb-2">
          Masukkan Email
        </label>
        <input
          type="email"
          className="flex h-10 w-full p-2 rounded-lg border-2 border-black items-center"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mt-10 flex justify-end">
        <Button textBtn="Kirim Email" w="auto" px={8} />
      </div>
    </form>
  );
}

export default ForgotPassword;
