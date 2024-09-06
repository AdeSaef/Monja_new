import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/axios";
import InputField from "./InputField";
import { FaUser, FaKey } from "react-icons/fa";
import Button from "./button";
import { getRoleFromToken } from "../../utils/utils";
import { guidAplication } from "../../api/axios";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginData = {
    email : email,
    password : password,
    guidAplication : `${guidAplication}`
  }
  const navigate = useNavigate();
  const gotoForgotPassword =() =>{
    navigate("/forgot-password")
  }
  const gotoRegister =() =>{
    navigate("/register")
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userApi.post("/users/login", loginData);

      if (response.data.success) {
        alert(response.data.message);
        
        const userToken = response.data.data.userToken;
        const appToken = response.data.data.appToken;
        localStorage.setItem('userToken', userToken); 
        localStorage.setItem('appToken', appToken); 
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat melakukan login");
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="interactive select-none">
      <InputField
        id="email"
        type="email"
        placeholder="Masukkan email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<FaUser className="w-full h-auto my-auto" />}
      />
      <InputField
        id="password"
        type="password"
        placeholder="Masukkan password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<FaKey className="w-full h-auto transform scale-x-[-1] my-auto" />}
      />
      <div className="flex mt-4 justify-between text-center">
        <button
          onClick={gotoRegister}
          className="underline text-black hover:font-semibold select-none"
        >
          Register
        </button>
        <button
          onClick={gotoForgotPassword}
          className="underline text-black hover:font-semibold"
        >
          Lupa Password?
        </button>
      </div>
      <Button textBtn="Masuk"/>
    </form>
  );
}

export default FormLogin;
