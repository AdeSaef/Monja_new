import React, { useState } from "react";
import Button from "./button";

function EmailVerification() {
  const [formData, setFormData] = useState({ verifCode: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Kode Verifikasi: ${formData.verifCode}`);
    console.log(formData);
    window.location.href = "/new-password";
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-96">
      <p className="mb-2">
        Monja meminta data kepada Anda untuk mereset password
      </p>
      <p className="mb-4">
        Kami Mengirimkan Kode verifikasi untuk memastikan bahwa yang mengirimkan
        data benar-benar Anda
      </p>
      <div className="mb-4">
        <label htmlFor="verifCode" className="block text-sm mb-2">
          Masukkan Kode Verifikasi
        </label>
        <input
          type="text"
          className="flex h-10 w-full p-2 rounded-lg border-2 border-black items-center"
          id="verifCode"
          name="verifCode"
          value={formData.verifCode}
          onChange={handleChange}
        />
      </div>
      <div className="mt-20 flex justify-end">
        <Button textBtn="Verifikasi" w="auto" px={8} />
      </div>
    </form>
  );
}

export default EmailVerification;
