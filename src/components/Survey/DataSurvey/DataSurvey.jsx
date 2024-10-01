import React, { useEffect, useState } from "react";
import { useHomePageLogic } from "../../../services/homepage";
// import DetailSurvey from "./detailSurvey";
import { Validation } from "../../../services/verifikasi_data";
import { getSurveyData } from "../../../services/surveyService";
import { FaArrowRightLong } from "react-icons/fa6";
// import DetailDataSurvey from "./DetailDataSurvey";
import { getSurveybyId } from "../../../services/surveyService";

const DetailTable = ({ data }) => {
  console.log(data);
  return (
    <div className="container mx-auto p-0 z-50">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border">No.</th>
            <th className="py-2 border">GUID Survey</th>
            <th className="py-2 border">GUID Ruas</th>
            <th className="py-2 border">Ruas</th>
            <th className="py-2 border">Nama File Video</th>
            <th className="py-2 border">Surveyor</th>
            <th className="py-2 border">Tanggal Survey</th>
            <th className="py-2 border">Uploader</th>
            <th className="py-2 border">Tanggal Upload</th>
            <th className="py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((survey, index) => (
            <tr key={index} className="text-center border-b">
              <td className="py-2 border">{index + 1}</td>
              <td className="py-2 border">{survey.guid_survey}</td>
              <td className="py-2 border">{survey.guid_rute}</td>
              <td className="py-2 border">{survey.rute}</td>
              <td className="py-2 border">{survey.namafiles}</td>
              <td className="py-2 border">{survey.surveyor}</td>
              <td className="py-2 border">{survey.tanggal_survey}</td>
              <td className="py-2 border">{survey.uploader || "-"}</td>
              <td className="py-2 border">{survey.tanggal_upload || "-"}</td>
              <td
                className={`py-2 border ${
                  survey.status === "belum upload" ? "bg-red-500" : "bg-green-500"
                } rounded-xl`}
              >
                {survey.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SurveyTable = ({ data, onDetail }) => (
  <div className="overflow-x-auto z-50">
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left border-2 bg-white border-gray-200 text-lg font-medium uppercase tracking-wider">
            No.
          </th>
          <th className="px-6 py-3 text-left border-2 bg-white border-gray-200 text-lg font-medium uppercase tracking-wider">
            Ruas
          </th>
          <th className="px-6 py-3 text-left border-2 bg-white border-gray-200 text-lg font-medium uppercase tracking-wider">
            Tanggal
          </th>
          <th className="px-6 py-3 text-left border-2 bg-white border-gray-200 text-lg font-medium uppercase tracking-wider">
            Surveyor
          </th>
          <th className="px-6 py-3 text-left border-2 bg-white border-gray-200 text-lg font-medium uppercase tracking-wider">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={item.guid_survey}>
            <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-lg font-medium">
              {index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md">
              {item.rute}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md">
              {item.tanggal_survey}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md">
              {item.surveyor}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md font-medium">
              <button
                className="text-white bg-blue-600 rounded-md px-4 hover:bg-blue-700 cursor-pointer"
                onClick={() => onDetail(item.guid_survey)}
              >
                Detail
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DataSurvey = ({closeDataSurvey}) => {
  if (!Validation()) {
    return <Navigate to="/login" />;
  }
  const {
    isDataSurvey,
  } = useHomePageLogic();


  
  const [detailDataSurvey, setDetailDataSurvey] = useState([]);
  const [IsdetailDataSurvey, setIsDetailDataSurvey] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [dataSurvey, setDataSurvey] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const handleDetailDataSurvey = (id) => {
    fetchSurveyDetailData(id);
    // setIsDetailDataSurvey(true);
    console.log("clicked",id,"and", IsdetailDataSurvey)
  };

  const closeDetailDataSurvey = () => {
    setIsDetailDataSurvey(false);
    setSelectedSurveyId(null);
  };

  const fetchSurveyDetailData = async (surveyId) => {
    try {
      const surveyDetail = await getSurveybyId(surveyId);
      setDetailDataSurvey([surveyDetail]);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
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
    fetchSurvey(currentPage);
    // fetchSurveyDetailData('8cf22e2a-c6db-49f4-870e-2619ecbdc8e8');
    // setDetailDataSurvey(false);
  }, []);

  return (
    <div className="fixed h-screen w-screen" onClick={closeDataSurvey}>
      <div className="h-full mt-9 select-none flex flex-col">
        <div className="absolute bg-black opacity-80 top-9 left-0 w-full h-full z-10"></div>
        <div className="z-50">
          <h1 className="flex justify-center text-3xl w-8 ml-2 mt-2 text-white font-semibold cursor-pointer" onClick={closeDataSurvey}>
            X
          </h1>
        </div>
        <div className="flex w-9/12 mx-auto justify-between mb-2 z-50">
          <p className="text-2xl text-white select-none ml-6">DATA SURVEY</p>
          <div className="flex mr-6 rounded-md overflow-clip">
            <div className="bg-slate-600 px-1 py-0">Data Survey</div>
            <div className="bg-slate-600 px-1 py-0">Kurasi Survey</div>
          </div>
        </div>
        <div className="flex w-10/12 mx-auto overflow-y-scroll">
          <div className="w-1/12 flex flex-col justify-center">
            back
            <div className="flex items-center justify-center w-full h-full">
              <FaArrowRightLong className="text-white w-full h-full" />
            </div>
          </div>
          {/* <div className="border-4 border-gray-600 rounded-3xl h-auto overflow-clip w-full flex flex-col">
            <DetailTable data={detailDataSurvey} className="w-full z-50" />
          </div> */}
          <div className="border-4 border-gray-600 rounded-3xl h-auto overflow-clip w-full flex flex-col">
            <DetailTable data={detailDataSurvey} className="w-full z-50" />
            {/* <SurveyTable data={dataSurvey} onDetail={handleDetailDataSurvey} /> */}
          </div>
          <div className="w-1/12 flex flex-col justify-center">next</div>
        </div>

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
      {/* {detailDataSurvey && <DetailDataSurvey onClose={closeDetailDataSurvey} surveyId={selectedSurveyId} />} */}
    </div>
  );
};

export default DataSurvey;
