import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MapScreen from "../components/Maps/MapScreen";
import ProfileIcon from "../components/profile/ProfileIcon";
import SettingScreen from "../components/profile/SettingScreen";
import EditProfile from "../components/profile/EditProf";
import Panel from "../components/panel/PanelBtn";
import MapsKonten from "../components/panel/MapsKonten/MapKonten";
import SurveyBtn from "../components/panel/surveyBtn";
import { useHomePageLogic } from "../services/homepage";
import { getProfile } from "../services/profileService";
import { Validation } from "../services/verifikasi_data";
import Tunel from "../components/panel/MapsKonten/tunel";

const HomePage = () => {
  const {
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
  } = useHomePageLogic();
  const [koordinat, setKoordinat] = useState([]);

  useEffect(() => {
    console.log("selected homepage :", koordinatSelected);
  }, [koordinatSelected]);

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
    <div>
      <MapScreen hide={hide} koordinat={koordinat} />

      <ProfileIcon
        isProfile={isProfile}
        toggleEditProfile={toggleEditProfile}
        toggleSetting={toggleSetting}
        imgprofile={imgprofile}
      />
      <SettingScreen isSetting={isSetting} />
      <EditProfile
        isEditProfile={isEditProfile}
        toggleEditProfile={toggleEditProfile}
        profile={profile}
      />
      <div className="w-1/3 h-80 absolute top-1 right-0 flex flex-col z-50">
        <div className="flex h-8">
          <SurveyBtn
            isRotated={isRotated}
            surveyMenu={surveyMenu}
            isOff={isOff}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
