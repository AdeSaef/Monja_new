import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKoordinatReport } from "./ruteService";
import { getDetailSurvey } from "./surveyService";

export const useHomePageLogic = () => {
  const navigate = useNavigate();
  const [isRotated, setIsRotated] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isDetailProfile, setIsDetailProfile] = useState(false);
  const [isProfile, setIsProfile] = useState(true);
  const [isSetting, setIsSetting] = useState(false);
  const [ismapsOpen, setmapsOpen] = useState(false);
  const [isDataSurvey, setIsDataSurvey] = useState(false);
  const [isrouteOpen, setrouteOpen] = useState(true);
  const [issurveyOpen, setsurveyOpen] = useState(true);
  const [InputDetailReport, setDetailReport] = useState({});
  const [isDetailReport, setIsDetailReport] = useState(false);
  const [isMoreDetailReport, setIsMoreDetailReport] = useState(false);
  const [koordinatSelected, setKoordinat] = useState([]);
  const [allDataSelected, setAllData] = useState({});
  const [notFound, setNotFound] = useState(false);

  const openDataSurvey = ()=>{
    setmapsOpen(true);
    setIsDataSurvey(true);
    surveyMenu();
  }
  const closeDataSurvey = ()=>{
    setIsDataSurvey(false);
  }

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
  const toggleDetailProfile = () => {
    setIsDetailProfile((prev) => !prev);
    setIsProfile(true);
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
      const fetchkoordinat = await getKoordinatReport(rute, tgl);

      const allKoordinat = fetchkoordinat.map((item) => item.coordinate);
      const allData = fetchkoordinat;
      setKoordinat(allKoordinat);
      setAllData(allData);
      setNotFound(false);
    } catch (error) {
      setNotFound(true);
      console.log("Error fetching koordinat:", error);
    }
  };

  const ambilDetailReport = async (id) => {
    try {
      const fetchkoordinat = await getDetailSurvey(id);
      const allData = fetchkoordinat;
      console.log("alldata :",allData);
      setDetailReport(allData);
    } catch (error) {
      console.log("Error fetching koordinat:", error);
    }
  };

  const pinClickHandle = (id) =>{
    ambilDetailReport(id);
    setIsDetailReport(true);
  } 
  const MoreDetailOpen = (id) =>{
    ambilDetailReport(id);
    setIsMoreDetailReport(true);
  } 
  const closeDetailReport = () =>{
    setIsDetailReport(false);
  } 
  const closeMoreDetailReport = () =>{
    setIsMoreDetailReport(false);
  } 
  
  const ambilInput = (rute, date) => {
    ambilKordinat(rute,date);
  };



  return {
    isRotated,
    isHidden,
    isOff,
    isEditProfile,
    isDetailProfile,
    isProfile,
    isSetting,
    ismapsOpen,
    isrouteOpen,
    issurveyOpen,
    isDataSurvey,
    InputDetailReport,
    isDetailReport,
    isMoreDetailReport,
    koordinatSelected,
    allDataSelected,
    notFound,
    surveyMenu,
    buttonPanel,
    toggleEditProfile,
    toggleDetailProfile,
    toggleSetting,
    hide,
    mapsOpen,
    routeOpen,
    surveyOpen,
    ambilInput,
    setmapsOpen,
    setrouteOpen,
    setsurveyOpen,
    openDataSurvey,
    setIsDataSurvey,
    closeDataSurvey,
    pinClickHandle,
    closeDetailReport,
    closeMoreDetailReport,
    MoreDetailOpen,
  };
};
