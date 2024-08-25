import React, { useState } from "react";
import { useLocation } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import Button from "./button";
import { userApi } from "../../api/axios";


const Activation = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const { email, guidAplication } = location.state || {}; 
  const [formOTP, setFormData] = useState({
    email: email || "", 
    guidAplication: guidAplication || "", 
    otp: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formOTP,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userApi.post("/users/activate", formOTP);

      if (response.data.success) {
        navigate("/login");
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat melakukan pendaftaran");
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-96">
      <p className="mb-2">Monja telah mengirim kode OTP ke email Anda</p>
      <p>
        Email:
        <span className="border-2 px-1 border-black rounded-md">{email}</span>
      </p>
      <p className="mb-4">
        Kami Mengirimkan Kode verifikasi untuk memastikan bahwa yang mengirimkan
        data benar-benar anda
      </p>
      <label htmlFor="otp">Masukkan Kode OTP :</label>
      <input
        type="text"
        className="flex h-10 w-full p-2 mb-2 rounded-lg border-2 border-black items-center"
        id="otp"
        name="otp"
        value={formOTP.otp}
        onChange={handleChange}
      />
      <div className="mt-4 flex justify-end">
        <Button textBtn="Aktivasi" w="auto" px={8} />
      </div>
    </form>
  );
};

export default Activation;
