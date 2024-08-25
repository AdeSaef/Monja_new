import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import { userApi } from "../../api/axios";

function FormRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    guidAplication: "PROJECT-dd872261-8665-4b22-b052-9ba09053ce73-2024",
    role: "admin",
    companyGuild: "",
  });
  const [options, setOptions] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.get("/companies");
        const data = response.data.data;
        const formattedOptions = data.map((item) => ({
          value: item.guid,
          label: item.name,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak sesuai!");
      return;
    }

    try {
      const response = await userApi.post("/users/register", formData);

      if (response.data.success) {
        alert(response.data.message);
        navigate("/activation", {
          state: {
            email: formData.email,
            guidAplication: formData.guidAplication,
          },
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat melakukan pendaftaran");
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-4">
      <p>Instansi</p>
      <div className="border-2 border-black rounded-lg overflow-hidden h-10 py-auto mb-2">
        <select
          className="form-select w-full h-full p-2"
          name="companyGuild"
          value={formData.companyGuild}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="name" className="block text-sm mb-0">
          Masukkan Nama
        </label>
        <input
          type="text"
          className="flex h-full w-full p-2 rounded-lg border-2 border-black items-center md:h-10 lg:h-10"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="phoneNumber" className="block text-sm mb-0">
          Masukkan No HP
        </label>
        <input
          type="text"
          className="flex h-10 w-full p-2 rounded-lg border-2 border-black items-center md:h-10 lg:h-10 "
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="block text-sm mb-0">
          Masukkan Email
        </label>
        <input
          type="email"
          className="flex h-10 w-full p-2 rounded-lg border-2 border-black items-center md:h-10 lg:h-10 "
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="block text-sm mb-0">
          Masukkan Password
        </label>
        <input
          type="password"
          className="flex h-10 w-full p-2 rounded-lg border-2 border-black items-center md:h-10 lg:h-10 "
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="confirmPassword" className="block text-sm mb-0">
          Konfirmasi Password
        </label>
        <input
          type="password"
          className="flex h-10 w-full p-2 rounded-lg border-2 border-black items-center md:h-10 lg:h-10 "
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-end mt-0 justify-end">
        <Button textBtn="Daftar" w="auto" px={8} />
      </div>
    </form>
  );
}

export default FormRegister;
