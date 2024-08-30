import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKoordinatReport } from "./ruteService";

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
  const [InputData, setData] = useState({});
  const [koordinatSelected, setKoordinat] = useState([]);

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

  const ambilKordinat = async (rute, tgl) => {
    try {
      // Memanggil API atau service untuk mendapatkan data koordinat
      const fetchkoordinat = await getKoordinatReport("3ec16c53-e88a-46cc-b5cb-05389ee1a2786fsfgf", tgl);
      console.log("fetch", fetchkoordinat);
  
      // Ambil semua koordinat dari respons dan simpan dalam state
      const allKoordinat = fetchkoordinat.map((item) => item.coordinate);
      console.log("Semua koordinat:", allKoordinat);
  
      // Set state koordinatSelected dengan array koordinat yang diperoleh
      setKoordinat(allKoordinat);
      console.log("Koordinat selected setelah update:", allKoordinat);
    } catch (error) {
      console.log("Error fetching koordinat:", error);
    }
  };
  
  const ambilInput = (rute, date) => {
    ambilKordinat(rute,date);
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
    koordinatSelected,
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
