import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKoordinatReport } from "./ruteService";
import { getDetailSurvey } from "./surveyService";
import { koordinatRuteGuid } from "./reportServices";


export const useHomePageLogic = () => {
  const navigate = useNavigate();
  const [isRotated, setIsRotated] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isDetailProfile, setIsDetailProfile] = useState(false);
  const [isMapScreen, setIsmapScreen] = useState(true);
  const [isProfile, setIsProfile] = useState(true);
  const [isSetting, setIsSetting] = useState(false);
  const [ismapsOpen, setmapsOpen] = useState(false);
  const [isManajemenSurvey, setManajemenSurvey] = useState(false);
  const [isManajemenRute, setManajemenRute] = useState(false);
  const [isDataSurvey, setIsDataSurvey] = useState(false);
  const [isKurasiSurvey, setIsKurasiSurvey] = useState(false);
  const [isDetailKurasiSurvey, setIsDetailKurasiSurvey] = useState(false);
  const [isrouteOpen, setrouteOpen] = useState(true);
  const [issurveyOpen, setsurveyOpen] = useState(true);
  const [InputDetailReport, setDetailReport] = useState({});
  const [isDetailReport, setIsDetailReport] = useState(false);
  const [isMoreDetailReport, setIsMoreDetailReport] = useState(false);
  const [koordinatSelected, setKoordinat] = useState([]);
  const [allDataSelected, setAllData] = useState({});
  const [notFound, setNotFound] = useState(false);

  const openDataSurvey = ()=>{
    setIsmapScreen(false);
    setIsDataSurvey(true);
    setIsEditProfile(false);
    setManajemenSurvey(false);
    setIsKurasiSurvey(false);
    setManajemenRute(false);
    // setIsDetailReport(false);
    // setmapsOpen(true); 
    // surveyMenu();
  }

  const switchDataSurvey = ()=>{
    setIsDataSurvey(true);
    setIsDetailReport(false);
    setIsKurasiSurvey(false)
    // closeKurasiSurvey();
    // setmapsOpen(true); 
  }
  
  const closeDataSurvey = ()=>{
    setIsDataSurvey(false);
    setIsmapScreen(true);
  }
  const openKurasiSurvey = ()=>{
    closeDataSurvey();
    setIsmapScreen(false);
    setIsKurasiSurvey(true);
    setIsEditProfile(false);
    setManajemenSurvey(false);
    setIsDataSurvey(false);
    setManajemenRute(false);
  }
  const switchKurasiSurvey = ()=>{
    setmapsOpen(true);
    setIsKurasiSurvey(true);
    closeDataSurvey();
  }
  const openDetailKurasi =()=>{
    setIsDetailKurasiSurvey(true);
  }

const closeKurasiSurvey = ()=>{
  setIsKurasiSurvey(false);
  mapsScreenOpen();
  // setIsDetailKurasiSurvey(false);
  // setmapsOpen(false);
}

const resetAllBooleans = () => {
  // setIsEditProfile(false);
  setIsDetailProfile(false);
  setIsmapScreen(false);
  setIsProfile(false);
  setIsSetting(false);
  setManajemenSurvey(false);
  setManajemenRute(false);
  setIsDataSurvey(false);
  setIsKurasiSurvey(false);
  setIsDetailKurasiSurvey(false);
  setIsDetailReport(false);
  setIsMoreDetailReport(false);
};

  const surveyMenu = () => {
    setIsRotated(!isRotated);
    setIsOff(!isOff);
  };

  const buttonPanel = () => {
    setIsHidden(!isHidden);
  };

  const toggleEditProfile = () => {
    setIsEditProfile(true);
    setIsProfile(true);
    setIsmapScreen(false);
    setIsDataSurvey(false);
    setManajemenRute(false);
    setManajemenSurvey(false);
    setIsDataSurvey(false);
  };
  const toggleDetailProfile = () => {
    setIsDetailProfile((prev) => !prev);
    setIsmapScreen(false);
    console.log(isMapScreen);
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
    setManajemenRute(true);
    setIsmapScreen(false);
    setIsEditProfile(false);
    setManajemenSurvey(false);
    setIsDataSurvey(false);
    setIsKurasiSurvey(false);
  };
  const surveyOpen = () => {
    setManajemenSurvey(true);
    setIsmapScreen(false);
    setIsEditProfile(false);
    setIsDataSurvey(false);
    setIsKurasiSurvey(false);
    setManajemenRute(false);
  };
  const mapsScreenOpen = () => {
    // console.log("tes klik")
    setIsEditProfile(false);
    setManajemenSurvey(false);
    setIsDataSurvey(false);
    setIsKurasiSurvey(false);
    setIsmapScreen(true);
    setManajemenRute(false);
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
  const ambilKordinatGuid = async (rute) => {
    try {
      const fetchkoordinat = await koordinatRuteGuid(rute);

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
  
      if (allData === null || !allData) {
        alert("Data tidak tersedia.");
        return false; // Indikasi data tidak ada
      }
  
      setDetailReport(allData);
      return true; // Indikasi data tersedia
    } catch (error) {
      console.log("Error fetching koordinat:", error);
      return false;
    }
  };
  
  
  const pinClickHandle = async (id) => {
    const result = await ambilDetailReport(id); // Cek hasil pemanggilan
    if (result) {
      setIsDetailReport(true); // Hanya aktif jika ada data
    }
  };
  
  
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

  const ambilInputGuid = (rute) => {
    ambilKordinatGuid(rute);
  };


  return {
    isRotated,
    isHidden,
    isOff,
    isEditProfile,
    isDetailProfile,
    isMapScreen,
    isProfile,
    isSetting,
    ismapsOpen,
    isrouteOpen,
    issurveyOpen,
    isManajemenSurvey,
    isManajemenRute,
    isDataSurvey,
    isKurasiSurvey,
    isDetailKurasiSurvey,
    InputDetailReport,
    isDetailReport,
    isMoreDetailReport,
    koordinatSelected,
    allDataSelected,
    notFound,
    mapsScreenOpen,
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
    ambilInputGuid,
    setmapsOpen,
    setrouteOpen,
    setsurveyOpen,
    openDataSurvey,
    setIsKurasiSurvey,
    openKurasiSurvey,
    openDetailKurasi,
    setIsDetailKurasiSurvey,
    setIsDataSurvey,
    switchDataSurvey,
    switchKurasiSurvey,
    closeDataSurvey,
    closeKurasiSurvey,
    pinClickHandle,
    closeDetailReport,
    closeMoreDetailReport,
    MoreDetailOpen,
    resetAllBooleans,
  };
};
