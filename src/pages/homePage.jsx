import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MapScreen from "../components/Maps/MapScreen";
import ProfileIcon from "../components/profile/ProfileIcon";
import SettingScreen from "../components/profile/SettingScreen";
import EditProfile from "../components/profile/EditProf";
import DetailProfile from "../components/profile/detailProfile";
import Panel from "../components/panel/PanelBtn";
import MapsKonten from "../components/panel/MapsKonten/MapKonten";
import SurveyBtn from "../components/panel/surveyBtn";
import { useHomePageLogic } from "../services/homepage";
import { getProfile } from "../services/profileService";
import { Validation } from "../services/verifikasi_data";
import Tunel from "../components/panel/MapsKonten/tunel";
import DataSurvey from "../components/Survey/DataSurvey/DataSurvey";
import DetailReport from "../components/Maps/DetailReport";
import MoreDetailReport from "../components/Report/DetailReport";

const HomePage = () => {
  const {
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
    InputDetailReport,
    isDataSurvey,
    koordinatSelected,
    allDataSelected,
    isDetailReport,
    isMoreDetailReport,
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
    openDataSurvey,
    closeDataSurvey,
    ambilInput,
    pinClickHandle,
    closeDetailReport,
    closeMoreDetailReport,
    MoreDetailOpen,
  } = useHomePageLogic();
  const [koordinat, setKoordinat] = useState([]);

  // useEffect(() => {
  //   console.log("selected homepage :", koordinatSelected);
  // }, [koordinatSelected]);

  useEffect(() => {
    setKoordinat(koordinatSelected);
  }, [koordinatSelected]);

  const [imgprofile, setProfile] = useState(null);
  const [profile, setProfileData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        if (profileData && profileData.user) {
          setProfile(profileData.user.imageProfile);
          setProfileData(profileData.user);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!Validation()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="transform scale-100">
      <MapScreen hide={hide} koordinat={koordinat} allData={allDataSelected} pinClickHandle={pinClickHandle}/>
      {isDetailReport && <DetailReport closeDetailReport={closeDetailReport} data={InputDetailReport} MoreDetailOpen={MoreDetailOpen} />}
      {isMoreDetailReport && <MoreDetailReport closeMoreDetailReport={closeMoreDetailReport} data={InputDetailReport}/>}
      {/* <MoreDetailReport data={InputDetailReport}/> */}
      <ProfileIcon
        isProfile={isProfile}
        toggleEditProfile={toggleEditProfile}
        toggleDetailProfile={toggleDetailProfile}
        toggleSetting={toggleSetting}
        imgprofile={imgprofile}
      />
      <SettingScreen isSetting={isSetting} imgprofile={imgprofile} username={profile}/>
      <EditProfile
        isEditProfile={isEditProfile}
        toggleEditProfile={toggleEditProfile}
        profile={profile}
        imgprofile={imgprofile}
      />
      <DetailProfile
        isDetailProfile={isDetailProfile}
        toggleDetailProfile={toggleDetailProfile}
        profile={profile}
        imgprofile={imgprofile}
      />
      {isDataSurvey && <DataSurvey closeDataSurvey={closeDataSurvey} />}
      <div
        className={`w-1/3 ${
          ismapsOpen ? "h-8" : "h-80"
        } absolute top-1 right-0 flex flex-col z-30`}
      >
        <div className="flex h-8">
          <SurveyBtn
            isRotated={isRotated}
            surveyMenu={surveyMenu}
            isOff={isOff}
            openDataSurvey={openDataSurvey}
          />
          <div className={`px-1 w-full h-auto z-50`}>
            <Panel
              mapsOpen={mapsOpen}
              ismapsOpen={ismapsOpen}
              surveyOpen={surveyOpen}
              issurveyOpen={issurveyOpen}
              routeOpen={routeOpen}
              isrouteOpen={isrouteOpen}
            />
            <Tunel
              ismapsOpen={ismapsOpen}
              isHidden={isHidden}
              buttonPanel={buttonPanel}
            />
            <MapsKonten
              isHidden={isHidden}
              ismapsOpen={ismapsOpen}
              ambilInput={ambilInput}
              notFound={notFound}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
