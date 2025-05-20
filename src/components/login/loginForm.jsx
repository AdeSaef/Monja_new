import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/axios";
import { FaUser, FaKey } from "react-icons/fa";
import { getRoleFromToken } from "../../utils/utils";
import { guidAplication } from "../../api/axios";
import LogoMonja from "./monja";
import bgimage from "../../assets/Background.png";
import Logo from "./logo";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginData = {
    email: email,
    password: password,
    guidAplication: `${guidAplication}`,
  };
  const navigate = useNavigate();
  const gotoForgotPassword = () => {
    navigate("/forgot-password");
  };
  const gotoRegister = () => {
    navigate("/register");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(loginData);
      const response = await userApi.post("/users/login", loginData);

      if (response.data.success) {
        alert(response.data.message);
        console.log(response.data.data);
        const userToken = response.data.data.userToken;
        const appToken = response.data.data.appToken;
        localStorage.setItem("userToken", userToken);
        localStorage.setItem("appToken", appToken);
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
    <div className="bg-white flex justify-center">
      <img src={bgimage} className="fixed top-0 left-0 w-screen h-screen object-cover opacity-25" />
      <Logo />
      <div className="flex select-none h-screen items-center">
        <div
          className={`container non-interactive min-w-64 sm:w-72 md:w-80 lg:w-96 w-max-2xl flex flex-col relative select-none`}
        >
          <LogoMonja lsize="w-28" />
          <form onSubmit={handleLogin} className="interactive select-none">
            <div className="mb-4">
              <div className="flex bg-white rounded-lg border-2 border-black items-center h-10">
                <div className="flex flex-col p-3 w-12 h-12 md:w-14 lg:w-10">
                  <FaUser className="w-full h-auto my-auto" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-l-2 h-full border-black bg-transparent w-full px-1 py-1 focus:outline-none placeholder:text-xs placeholder:underline"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex bg-white rounded-lg border-2 border-black items-center h-10">
                <div className="flex flex-col p-3 w-12 h-12 md:w-14 lg:w-10">
                  <FaKey className="w-full h-auto transform scale-x-[-1] my-auto" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-l-2 h-full border-black bg-transparent w-full px-1 py-1 focus:outline-none placeholder:text-xs placeholder:underline"
                />
              </div>
            </div>
            <div className="flex mt-4 justify-end text-center">
              <button
                onClick={gotoForgotPassword}
                className="underline text-black hover:font-semibold"
              >
                Lupa Password?
              </button>
            </div>
            <div>
              <button
                type="submit"
                className={`w-full mt-7 bg-blue-900 text-white px-2 py-2 rounded-md hover:bg-blue-700 select-none `}
              >
                Masuk
              </button>
            </div>
            <div>
              <button
                className={`w-full mt-2 bg-green-400 text-white px-2 py-2 rounded-lg hover:bg-green-700 select-none `}
                onClick={gotoRegister}
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
