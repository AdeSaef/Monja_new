import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MapScreen from "../components/Maps/MapScreen";
import ProfileIcon from "../components/profile/ProfileIcon";
import SettingScreen from "../components/profile/SettingScreen";
import EditProfile from "../components/profile/EditProf";
import ManajemenSurvey from "../components/panel/SurveyManajemen/ManajemenSurvey";
import ManajemenRoute from "../components/panel/RouteManajemen/manajemenRoute";
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
import KurasiSurvey from "../components/Survey/kurasiSurvey/KurasiSurvey";
import DetailKurasiSurvey from "../components/Survey/kurasiSurvey/DetailKurasiSurvey";
import monja from "../assets/logo/logo_monja.png";
// import ManajemenRoute from "../components/panel/RouteManajemen/manajemenRoute";

const HomePage = ({mode}) => {
  const {
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
    InputDetailReport,
    isManajemenSurvey,
    isManajemenRute,
    isDataSurvey,
    isKurasiSurvey,
    isDetailKurasiSurvey,
    koordinatSelected,
    allDataSelected,
    isDetailReport,
    isMoreDetailReport,
    notFound,
    surveyMenu,
    buttonPanel,
    mapsScreenOpen,
    toggleEditProfile,
    toggleDetailProfile,
    toggleSetting,
    hide,
    mapsOpen,
    routeOpen,
    surveyOpen,
    openDataSurvey,
    setIsKurasiSurvey,
    openKurasiSurvey,
    openDetailKurasi,
    setIsDetailKurasiSurvey,
    switchDataSurvey,
    switchKurasiSurvey,
    closeDataSurvey,
    closeKurasiSurvey,
    ambilInput,
    ambilInputGuid,
    pinClickHandle,
    closeDetailReport,
    closeMoreDetailReport,
    MoreDetailOpen,
    resetAllBooleans,
  } = useHomePageLogic();
  const [koordinat, setKoordinat] = useState([]);
  const [idKurasi, setId] = useState();
  const [guidKurasi, setGuidKurasi] = useState();


  // useEffect(() => {
  //   console.log("selected homepage :", koordinatSelected);
  // }, [koordinatSelected]);
  // useEffect(() => {
  //   resetAllBooleans();
  //   if (mode === "detailKurasiSurvey") {
  //     setIsDetailKurasiSurvey(true);
  //   }
  // }, [mode]);
  
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

  const test=()=>{
    setIsKurasiSurvey(false);
    mapsScreenOpen();
    setIsDetailKurasiSurvey(true);
  }

  return (
    <div className="w-screen h-screen overflow-clip">
      <div className="flex flex-col">
        <div className="h-20 w-full flex justify-between select-none">
          <div className="ml-4">
            <img src={monja} className="h-20 w-auto" />
          </div>
          <div className="flex select-none m-1">
            <div className="mr-2 flex flex-col justify-center">
              <p className="font-bold text-right">{profile.name}</p>
              {/* <p className="text-right text-sm">Jobs</p> */}
              <p className="text-right text-sm">{profile.address}</p>
            </div>
            <div className="flex flex-col justify-center">
              <ProfileIcon
                isProfile={isDetailProfile}
                toggleEditProfile={toggleEditProfile}
                toggleDetailProfile={toggleDetailProfile}
                setDashboard={mapsScreenOpen}
                toggleSetting={toggleSetting}
                imgprofile={imgprofile}
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/5 h-screen bg-gray-200 p-2 flex flex-col">
            <div
              className="w-full h-8 bg-white border border-black rounded-md font-semibold whitespace-nowrap text-md flex flex-col justify-center p-2 select-none cursor-pointer my-1"
              onClick={mapsScreenOpen}
            >
              Dashboard
            </div>
            <div
              className="w-full h-8 bg-white border border-black rounded-md font-semibold whitespace-nowrap text-md flex flex-col justify-center p-2 select-none cursor-pointer my-1"
              onClick={surveyOpen}
            >
              Manajemen Survey
            </div>
            <div
              className="w-full h-8 bg-white border border-black rounded-md font-semibold whitespace-nowrap text-md flex flex-col justify-center p-2 select-none cursor-pointer my-1"
              onClick={openKurasiSurvey}
            >
              Kurasi Survey
            </div>
            <div
              className="w-full h-8 bg-white border border-black rounded-md font-semibold whitespace-nowrap text-md flex flex-col justify-center p-2 select-none cursor-pointer my-1"
              onClick={openDataSurvey}
            >
              Data Survey
            </div>
            <div
              className="w-full h-8 bg-white border border-black rounded-md font-semibold whitespace-nowrap text-md flex flex-col justify-center p-2 select-none cursor-pointer my-1"
              onClick={routeOpen}
            >
              Manajemen Rute
            </div>
            {/* <div
              className="w-full h-8 bg-white border border-black rounded-md font-semibold whitespace-nowrap text-md flex flex-col justify-center p-2 select-none cursor-pointer my-1"
              onClick={() => console.log(isEditProfile)}
            >
              test
            </div> */}
          </div>
          <div className="w-4/5 h-full overflow-clip relative">
            {/* maps screen */}
            {isMapScreen && (
              <MapScreen
                hide={hide}
                koordinat={koordinat}
                allData={allDataSelected}
                pinClickHandle={pinClickHandle}
              />
            )}
            {isMapScreen && (
              <MapsKonten
                isHidden={isHidden}
                ismapsOpen={ismapsOpen}
                ambilInput={ambilInput}
                notFound={notFound}
                ambilInputGuid={ambilInputGuid}
              />
            )}

            {/* report */}
            {isDetailReport && (
              <DetailReport
                closeDetailReport={closeDetailReport}
                data={InputDetailReport}
                MoreDetailOpen={MoreDetailOpen}
              />
            )}
            {isMoreDetailReport && (
              <MoreDetailReport
                closeMoreDetailReport={closeMoreDetailReport}
                data={InputDetailReport}
              />
            )}

            {/* profile */}
            <SettingScreen
              isSetting={isSetting}
              imgprofile={imgprofile}
              username={profile}
            />
            {isEditProfile && (
              <EditProfile
                // isEditProfile={isEditProfile}
                toggleEditProfile={toggleEditProfile}
                imgprofile={imgprofile}
              />
            )}
            <DetailProfile
              isDetailProfile={isDetailProfile}
              toggleDetailProfile={toggleDetailProfile}
              profile={profile}
              imgprofile={imgprofile}
            />
            {/* survey */}
            {isDataSurvey && (
              <DataSurvey
                closeDataSurvey={closeDataSurvey}
                switchKurasiSurvey={switchKurasiSurvey}
              />
            )}
            {isKurasiSurvey && (
              <KurasiSurvey
                closeKurasiSurvey={closeKurasiSurvey}
                switchDataSurvey={switchDataSurvey}
                openDetailSurvey={test}
                // isDetail={isDetailKurasiSurvey}
                setGuid={setGuidKurasi}
                setId={setId}
              />
            )}
            {isDetailKurasiSurvey && (
              <DetailKurasiSurvey
                className="z-50"
                setDetail={setIsDetailKurasiSurvey}
                guidsurvey={guidKurasi}
                idKurasi={idKurasi}
                // guidsurvey="1fea7dec-c915-44b1-b606-bd60b9dabcc1"
                // objectId
                // idKurasi="6729ceb401e25b2e21c11bbe"
                //string
                // idKurasi="66e11333bd23816fa1dfc45b"
                MoreDetailOpen={MoreDetailOpen}
                closeKurasiSurvey={closeKurasiSurvey}
              />
            )}

            {/* m. survey */}
            {isManajemenSurvey && <ManajemenSurvey />}

            {/* m. rute */}
            {isManajemenRute && (<ManajemenRoute/>)}
            {/* <ManajemenRoute /> */}
            {/* <div
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
                openKurasiSurvey={openKurasiSurvey}
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
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
