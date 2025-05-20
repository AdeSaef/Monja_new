import React, { useEffect, useState } from "react";
import { useHomePageLogic } from "../../../services/homepage";
import Panel from "../PanelBtn";
import DetailSurvey from "./detailSurvey";
import navigation from "../../../assets/button/navigation.png";
import { Validation } from "../../../services/verifikasi_data";
import { getSurveyData } from "../../../services/surveyService";

const SurveyTable = ({ data, onDetail }) => (
  <div className="overflow-x-auto z-50">
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left border-2 border-gray-200 text-lg font-medium uppercase tracking-wider">No.</th>
          <th className="px-6 py-3 text-left border-2 border-gray-200 text-lg font-medium uppercase tracking-wider">Rute</th>
          <th className="px-6 py-3 text-left border-2 border-gray-200 text-lg font-medium uppercase tracking-wider">Tanggal</th>
          <th className="px-6 py-3 text-left border-2 border-gray-200 text-lg font-medium uppercase tracking-wider">Surveyor</th>
          <th className="px-6 py-3 text-left border-2 border-gray-200 text-lg font-medium uppercase tracking-wider">Aksi</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={item.guid_survey}>
            <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-lg font-medium">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md">{item.rute}</td>
            <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md">{item.tanggal_survey}</td>
            <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md">{item.surveyor}</td>
            <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md font-medium">
              <button className="text-white bg-blue-600 rounded-md px-4 hover:bg-blue-700 cursor-pointer" onClick={() => onDetail(item.guid_survey)}>Detail</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ManajemenSurvey = () => {
  if (!Validation()) {
    return <Navigate to="/login" />;
  }
  const { mapsOpen, ismapsOpen, surveyOpen, issurveyOpen, routeOpen, isrouteOpen, setmapsOpen, setsurveyOpen } = useHomePageLogic();

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
      const survey = await getSurveyData(page); // Asumsi: getSurveyData mengambil data untuk halaman tertentu
      setDataSurvey(survey.data);
      setTotalPages(survey.totalPage);
      setCurrentPage(survey.page);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  useEffect(() => {
    setmapsOpen(true);
    setsurveyOpen(false);
  }, [setmapsOpen, setsurveyOpen]);

  useEffect(() => {
    fetchSurvey(currentPage);
  }, []);

  return (
    <div className="bg-stone-500 h-screen w-screen">
      <div>
        <p className="text-5xl pt-16 mx-4 mb-2 text-white select-none">MANAJEMEN SURVEY</p>
      </div>
      <div className="bg-white h-auto px-20 py-3 select-none">
        <div className="border-4 border-gray-600 rounded-3xl h-auto overflow-clip">
          <SurveyTable data={dataSurvey} onDetail={handleDetailSurvey} />
        </div>
        <div className="flex justify-end my-5">
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
        </div>
      </div>
      {detailSurvey && <DetailSurvey onClose={closeDetailSurvey} surveyId={selectedSurveyId} />}
      {/* panel */}
      <div className="w-1/3 absolute top-1 right-0 z-10">
        <div className="flex h-8">
          <div className="w-1/12 mx-1 select-none"></div>
          <div className="px-1 w-full h-auto z-50">
            <Panel mapsOpen={mapsOpen} ismapsOpen={ismapsOpen} surveyOpen={surveyOpen} issurveyOpen={issurveyOpen} routeOpen={routeOpen} isrouteOpen={isrouteOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenSurvey;
