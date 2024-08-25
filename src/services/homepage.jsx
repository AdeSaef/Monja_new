import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHomePageLogic = () => {
  const navigate = useNavigate();
  const [isRotated, setIsRotated] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isProfile, setIsProfile] = useState(true);
  const [isSetting, setIsSetting] = useState(false);
  const [ismapsOpen, setmapsOpen] = useState(false);
  const [isrouteOpen, setrouteOpen] = useState(true);
  const [issurveyOpen, setsurveyOpen] = useState(true);
  const [InputData, setInput] = useState({ rute: "", tgl: "" });

  const surveyMenu = () => {
    setIsRotated(!isRotated);
    setIsOff(!isOff);
  };

  const buttonPanel = () => {
    setIsHidden(!isHidden);
  };

  const toggleEditProfile = () => {
    setIsEditProfile((prev) => !prev);
    setIsProfile((prev) => !prev);
  };

  const toggleSetting = () => {
    setIsSetting((prev) => !prev);
    setIsProfile((prev) => !prev);
  };

  const hide = () => {
    setIsSetting(false);
    setIsEditProfile(false);
    setIsProfile(true);
  };

  const mapsOpen = () => {
    if (ismapsOpen) {
      navigate("/");
    }
    setmapsOpen((prev) => !prev);
    setsurveyOpen(true);
    setrouteOpen(true);
  };
  
  const routeOpen = () => {
    if (isrouteOpen) {
      navigate("/route");
    } 
    setmapsOpen(true);
    setsurveyOpen(true);
  };
  const surveyOpen = () => {
    if (issurveyOpen) {
      navigate("/survey");
    }
    setmapsOpen(true);
    setrouteOpen(true);
  };

  const ambilInput = (data) => {
    setInput(data);
    console.log(InputData);
  };

  return {
    isRotated,
    isHidden,
    isOff,
    isEditProfile,
    isProfile,
    isSetting,
    ismapsOpen,
    isrouteOpen,
    issurveyOpen,
    InputData,
    surveyMenu,
    buttonPanel,
    toggleEditProfile,
    toggleSetting,
    hide,
    mapsOpen,
    routeOpen,
    surveyOpen,
    ambilInput,
    setmapsOpen,
    setrouteOpen,
    setsurveyOpen
  };
};
