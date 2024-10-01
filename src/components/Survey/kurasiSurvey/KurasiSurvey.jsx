import React, { useEffect, useState } from "react";
import { useHomePageLogic } from "../../../services/homepage";
// import DetailSurvey from "./detailSurvey";
import navigation from "../../../assets/button/navigation.png";
import { Validation } from "../../../services/verifikasi_data";
import { getSurveyData } from "../../../services/surveyService";
import { FaArrowRightLong } from "react-icons/fa6";



const KurasiSurvey = ({closeKurasiSurvey}) => {
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
    <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden z-50">
      <div className="h-full mt-10 select-none flex flex-col">
        <div className="flex justify-between z-50">
          <h1 className="text-3xl ml-2 mt-2 text-white font-semibold z-50 cursor-pointer" onClick={closeKurasiSurvey}>
            X
          </h1>
        </div>
        <div className="flex w-9/12 mx-auto justify-between mb-2">
          <p className="text-2xl text-white select-none ml-6">KURASI SURVEY</p>
          <div className="flex mr-6 rounded-md overflow-clip">
            <div className="bg-slate-600 px-1 py-0">Data Survey</div>
            <div className="bg-slate-600 px-1 py-0">Kurasi Survey</div>
          </div>
        </div>
        <div className="flex flex-col mb-10 w-6/12 mx-auto overflow-y-scroll">
          <div className="bg-blue-600 flex flex-col w-full h-auto p-1 my-1">
            <p className="text-white mx-3">Nama Rute</p>
            <div className="bg-white p-3">
              <p>guid_rute</p>
              <p>survey_terakhir_oleh</p>
              <p>tanggal_terakhir_survey</p>
              <p>upload_gambar_oleh</p>
              <p>tgl_upload_terakhir</p>
              <p>Video</p>
              <p>Station</p>
              <p>kilometer</p>
              <div className="flex">
                <div className="bg-green-400 hover:bg-green-600 p-3 rounded-md select-none cursor-pointer mr-2 text-white">Download Laporan</div>
                <div className="bg-gray-500 hover:bg-gray-600 p-3 rounded-md select-none cursor-pointer text-white">Detail Survey</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-600 flex flex-col w-full h-auto p-1 my-1">
            <p className="text-white mx-3">Nama Rute</p>
            <div className="bg-white p-3">
              <p>guid_rute</p>
              <p>survey_terakhir_oleh</p>
              <p>tanggal_terakhir_survey</p>
              <p>upload_gambar_oleh</p>
              <p>tgl_upload_terakhir</p>
              <p>Video</p>
              <p>Station</p>
              <p>kilometer</p>
              <div className="flex">
                <div className="bg-green-400 hover:bg-green-600 p-3 rounded-md select-none cursor-pointer mr-2 text-white">Download Laporan</div>
                <div className="bg-gray-500 hover:bg-gray-600 p-3 rounded-md select-none cursor-pointer text-white">Detail Survey</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-600 flex flex-col w-full h-auto p-1 my-1">
            <p className="text-white m-3">Nama Rute</p>
            <div className="bg-white p-3">
              <p>guid_rute</p>
              <p>survey_terakhir_oleh</p>
              <p>tanggal_terakhir_survey</p>
              <p>upload_gambar_oleh</p>
              <p>tgl_upload_terakhir</p>
              <p>Video</p>
              <p>Station</p>
              <p>kilometer</p>
              <div className="flex">
                <div className="bg-green-400 hover:bg-green-600 p-3 rounded-md select-none cursor-pointer mr-2 text-white">Download Laporan</div>
                <div className="bg-gray-500 hover:bg-gray-600 p-3 rounded-md select-none cursor-pointer text-white">Detail Survey</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-black opacity-50 h-full w-full -z-30"></div>

        {/* <div className="flex justify-end my-5">
          <div className={`flex flex-col justify-center ${currentPage === 1 ? "hidden" : ""}`}>
            <img
              src={navigation}
              className="transform rotate-180 h-5 w-8 cursor-pointer"
              onClick={backPage}
              alt="Back Page"
            />
          </div>
          <div className="w-6 border border-gray-300 rounded-xl mx-2 text-center py-1">{currentPage}</div>
          <div className={`flex flex-col justify-center ${currentPage >= totalPages ? "hidden" : ""}`}>
            <img
              src={navigation}
              className="h-5 w-8 cursor-pointer"
              onClick={nextPage}
              alt="Next Page"
            />
          </div>
        </div> */}
      </div>
      {/* {detailSurvey && <DetailSurvey onClose={closeDetailSurvey} surveyId={selectedSurveyId} />} */}
    </div>
  );
};

export default KurasiSurvey;
