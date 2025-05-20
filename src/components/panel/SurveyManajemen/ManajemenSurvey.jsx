import React, { useRef, useEffect, useState } from "react";
import { useHomePageLogic } from "../../../services/homepage";
import Panel from "../PanelBtn";
import DetailSurvey from "./detailSurvey";
import navigation from "../../../assets/button/navigation.png";
import { Validation } from "../../../services/verifikasi_data";
import { getSurveyData } from "../../../services/surveyService";

const SurveyTable = ({ data, onDetail }) => (
  <div className="z-50 h-full pb-36">
    <div className="z-50">
      <div className="min-w-full">
        {/* Header */}
        <div className="flex">
          <div className="px-6 py-3 text-center font-normal tracking-wider w-1/12">
            No.
          </div>
          <div className="px-6 py-3 text-center font-normal tracking-wider w-4/12">
            Rute
          </div>
          <div className="px-6 py-3 text-center font-normal tracking-wider w-3/12">
            Tanggal Survey
          </div>
          <div className="px-6 py-3 text-center font-normal tracking-wider w-2/12">
            Surveyor
          </div>
          <div className="px-6 py-3 text-center font-normal tracking-wider w-2/12">
            Aksi
          </div>
        </div>

        {/* Rows */}
        <div className="bg-white">
          {data.map((item, index) => (
            <div
              key={item.guid_survey}
              className="w-full flex rounded-lg border border-gray-600 my-1"
            >
              <div className=" flex flex-col justify-center text-lg text-center font-medium w-1/12">
                {index + 1}
              </div>
              <div className="flex flex-col justify-center text-md text-center w-4/12">
                {item.rute}
              </div>
              <div className="flex flex-col justify-center text-md text-center w-3/12">
                {item.tanggal_survey}
              </div>
              <div className="flex flex-col justify-center text-md text-center w-2/12">
                {item.surveyor}
              </div>
              <div className="flex flex-col justify-center text-sm text-center font-medium w-2/12">
                <div className="w-full flex justify-center">
                  <button
                    className="text-white bg-blue-600 rounded-md px-4 hover:bg-blue-700 cursor-pointer"
                    onClick={() => onDetail(item.guid_survey)}
                  >
                    Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ManajemenSurvey = ({ isEditProfile, toggleEditProfile, imgprofile }) => {
  if (!Validation()) {
    return <Navigate to="/login" />;
  }
  const {
    mapsOpen,
    ismapsOpen,
    surveyOpen,
    issurveyOpen,
    routeOpen,
    isrouteOpen,
    setmapsOpen,
    setsurveyOpen,
  } = useHomePageLogic();

  const [detailSurvey, setDetailSurvey] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [dataSurvey, setDataSurvey] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const handleDetailSurvey = (id) => {
    setSelectedSurveyId(id);
    setDetailSurvey(true);
  };

  const closeDetailSurvey = () => {
    setDetailSurvey(false);
    setSelectedSurveyId(null);
  };


  const fetchSurvey = async (page) => {
    try {
      const survey = await getSurveyData(page);
      // console.log(survey);
      if (survey) {
        const newData = survey.data || [];
        setDataSurvey((prevData) => {
          // Gabungkan data baru dengan data sebelumnya
          const combinedData = [...prevData, ...newData];
          // Hilangkan data duplikat berdasarkan atribut unik, misalnya `guid`
          const uniqueData = combinedData.filter(
            (value, index, self) =>
              index === self.findIndex((item) => item.guid_survey === value.guid_survey)
          );
          return uniqueData;
        });
        setCurrentPage(survey.page || 1);
        setTotalPages(survey.totalPage || 1);
      }
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      fetchSurvey(currentPage + i);
    }
  }, []);

  // scroll pagination
  const handleScrollEnd = () => {
    fetchSurvey(currentPage + 1);
  };
  const divRef = useRef(null);
  useEffect(() => {
    const handleScroll = (event) => {
      const div = divRef.current;

      if (!div) return;

      // Periksa apakah pengguna berada di akhir scroll
      const isAtBottom = div.scrollHeight - div.scrollTop === div.clientHeight;

      if (isAtBottom) {
        // Pastikan pengguna mencoba menggulir lebih jauh
        if (event.deltaY > 0) {
          handleScrollEnd(); // Panggil aksi ketika pengguna menggulir lebih jauh
        }
      }
    };

    const div = divRef.current;
    if (div) {
      div.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (div) {
        div.removeEventListener("wheel", handleScroll);
      }
    };
  }, [handleScrollEnd]);
  return (
    <div
      className={`w-full h-full flex flex-col select-none bg-gray-200
      `}
    >
      <div className="bg-white h-full w-full mt-4 relative">
        <div>
          <p className="text-xs absolute top-2 left-4 text-gray-700 select-none">
            Dashboard&gt;manajemen survey
          </p>
        </div>
        <div className="bg-white h-screen mt-4 py-3 select-none">
          <div ref={divRef} className="h-5/6 overflow-y-scroll scrollbar-thin">
            <div className="mr-4 ml-6">
              <SurveyTable data={dataSurvey} onDetail={handleDetailSurvey} />
            </div>
          </div>
          {/* <div className="flex justify-end my-5">
            <div
              className={`flex flex-col justify-center ${
                currentPage === 1 ? "hidden" : ""
              }`}
            >
              <img
                src={navigation}
                className="transform rotate-180 h-5 w-8 cursor-pointer"
                onClick={backPage}
                alt="Back Page"
              />
            </div>
            <div className="w-6 border border-gray-300 rounded-xl mx-2 text-center py-1">
              {currentPage}
            </div>
            <div
              className={`flex flex-col justify-center ${
                currentPage >= totalPages ? "hidden" : ""
              }`}
            >
              <img
                src={navigation}
                className="h-5 w-8 cursor-pointer"
                onClick={nextPage}
                alt="Next Page"
              />
            </div>
          </div> */}
        </div>
        {detailSurvey && (
          <DetailSurvey
            onClose={closeDetailSurvey}
            surveyId={selectedSurveyId}
          />
        )}
        {/* panel */}
        {/* <div className="w-1/3 absolute top-1 right-0 z-10">
          <div className="flex h-8">
            <div className="w-1/12 mx-1 select-none"></div>
            <div className="px-1 w-full h-auto z-50">
              <Panel
                mapsOpen={mapsOpen}
                ismapsOpen={ismapsOpen}
                surveyOpen={surveyOpen}
                issurveyOpen={issurveyOpen}
                routeOpen={routeOpen}
                isrouteOpen={isrouteOpen}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ManajemenSurvey;
