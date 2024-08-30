import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage.jsx";
import FormRegister from "../components/login/registerForm.jsx";
import FormLogin from "../components/login/loginForm.jsx";
import Logo from "../components/login/logo.jsx";
import Activation from "../components/login/activation.jsx";
import Berhasil from "../components/login/done.jsx";
import HomePage from "../pages/homePage.jsx";
import NewPassword from "../components/login/new_password.jsx";
import ForgotPassword from "../components/login/forgotPassword.jsx";
import ManajemenSurvey from "../components/panel/SurveyManajemen/manajemenSurvey.jsx";
import ManajemenRoute from "../components/panel/RouteManajemen/manajemenRoute.jsx";



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage mode={<FormLogin />} wlogo={<Logo />}/>} />
        <Route path="/register" element={<AuthPage mode={<FormRegister/>} ssize="my-10 px-0 pt-0"/>} />
        <Route path="/forgot-password" element={<AuthPage mode={<ForgotPassword />} lsize="mr-0 w-12 sm:w-10 md:w-12 lg:w-16"/>} /> 
        <Route path="/new-password" element={<AuthPage mode={<NewPassword />} lsize="mr-0 w-12 sm:w-10 md:w-12 lg:w-16"/>} /> 
        <Route path="/activation" element={<AuthPage mode={<Activation />} lsize="mr-0 w-12 sm:w-10 md:w-12 lg:w-16"/>} /> 
        <Route path="/berhasil" element={<AuthPage mode={<Berhasil />} lsize="m-3 my-0 w-12 sm:w-10 md:w-12 lg:w-16" ssize="h-[calc(100vh-5rem)] my-10 px-0"/>} /> 
        <Route path="/survey" element={< ManajemenSurvey />} />
        <Route path="/route" element={< ManajemenRoute />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
