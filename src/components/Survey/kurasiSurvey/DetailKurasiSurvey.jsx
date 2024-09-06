import React, { useEffect, useState } from "react";
import { useHomePageLogic } from "../../../services/homepage";
// import DetailSurvey from "./detailSurvey";
import navigation from "../../../assets/button/navigation.png";
import { Validation } from "../../../services/verifikasi_data";
import { getSurveyData } from "../../../services/surveyService";
import { FaArrowRightLong } from "react-icons/fa6";

const DetailKurasiSurvey = () => {
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

  const backPage = () => {
    if (currentPage > 1) {
      setDataSurvey([]);
      fetchSurvey(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setDataSurvey([]);
      fetchSurvey(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const fetchSurvey = async (page) => {
    try {
      const survey = await getSurveyData(page);
      setDataSurvey(survey.data);
      setTotalPages(survey.totalPage);
      setCurrentPage(survey.page);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  useEffect(() => {
    fetchSurvey(currentPage);
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="absolute top-6 left-6">
        <h1 className="text-3xl ml-2 mt-2 font-bold z-50 cursor-pointer">X</h1>
      </div>
      <div className=" bg-green-300 h-full mt-20 select-none flex flex-col">
        <div className="flex w-full h-96">
          <div className="bg-black w-5/12 h-full flex flex-col justify-center">
            <div className="bg-white w-full h-24 m-auto">
              Gambar
            </div>
          </div>
          <div className="w-2/12 h-full bg-green-200 overflow-y-scroll"></div>
          <div className="w-5/12 bg-slate-400 h-full"></div>
        </div>
        <div className="flex w-full h-96">
          <div className="w-5/12 h-full flex flex-col">
            <div className="flex w-full h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-1/2"></div>
              <div className="bg-white h-full w-1/2"></div>
            </div>
            <div className="flex w-full h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-1/2"></div>
              <div className="bg-white h-full w-1/2"></div>
            </div>
          </div>
          <div className="w-1/2 h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailKurasiSurvey;
