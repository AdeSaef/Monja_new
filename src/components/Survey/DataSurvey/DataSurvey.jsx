import React, { useEffect, useState } from "react";
import { Validation } from "../../../services/verifikasi_data";
import { getSurveyData } from "../../../services/surveyService";
import { getSurveybyId } from "../../../services/surveyService";
import next from "../../../assets/button/next.png";
import back from "../../../assets/button/back.png";

const DetailTable = ({ data }) => {
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
                  survey.status === "belum upload"
                    ? "bg-red-500"
                    : "bg-green-500"
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
  <div className="z-50">
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

const DataSurvey = ({ closeDataSurvey, switchKurasiSurvey }) => {
  if (!Validation()) {
    return <Navigate to="/login" />;
  }

  const [detailDataSurvey, setDetailDataSurvey] = useState([]);
  const [isSurveyTable, setIsDataTable] = useState(true);
  const [dataSurvey, setDataSurvey] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const handleDetailDataSurvey = (id) => {
    setIsDataTable(false);
    fetchSurveyDetailData(id);
  };

  const closeDetailDataSurvey = () => {
    setIsDataTable(true);
    setDetailDataSurvey([]);
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
    <div className="fixed h-screen w-screen overflow-clip">
      <div className="h-full mt-9 select-none flex flex-col">
        <div className="absolute bg-black opacity-60 top-9 left-0 w-full h-full -z-10"></div>
        <div className="z-50">
          <h1
            className="flex justify-center text-3xl w-8 ml-2 mt-2 text-white font-semibold cursor-pointer"
            onClick={isSurveyTable ? closeDataSurvey : closeDetailDataSurvey}
          >
            X
          </h1>
        </div>
        <div className="flex w-9/12 mx-auto justify-between mb-2 z-50">
          <p className="text-2xl text-white select-none ml-6">
            {isSurveyTable ? "DATA SURVEY" : "DETAIL SURVEY"}
          </p>
          <div className="flex mr-6 rounded-md overflow-clip">
            <div className="bg-slate-500 px-2 py-0 text-white select-none cursor-pointer">Data Survey</div>
            <div className="bg-white px-2 py-0 select-none cursor-pointer" onClick={switchKurasiSurvey}>Kurasi Survey</div>
          </div>
        </div>
        <div className="flex w-full justify-center mx-auto">
          <div className="flex justify-center w-1/12">
            <div
              className={`"w-1/12 h-4/6 flex flex-col justify-center p-4" ${
                isSurveyTable ? "" : "hidden"
              }`}
            >
              <img
                src={back}
                className="text-white w-16 h-auto select-none cursor-pointer"
                onClick={backPage}
              />
            </div>
          </div>
          <div className="flex flex-col w-10/12">
            <div
              className={`border-4 border-gray-500 rounded-3xl overflow-clip  flex flex-col ${
                isSurveyTable ? "h-4/6" : ""
              }`}
            >
              <div
                className={`"h-full" ${
                  isSurveyTable ? "overflow-y-scroll" : "overflow-x-scroll"
                }`}
              >
                {isSurveyTable ? (
                  <SurveyTable
                    data={dataSurvey}
                    onDetail={handleDetailDataSurvey}
                  />
                ) : (
                  <DetailTable data={detailDataSurvey} />
                )}
              </div>
            </div>
            <div className={`ml-2 mt-2 flex${isSurveyTable ? "hidden" : ""}`}>
              <div className="rounded-sm bg-slate-500 text-white text-center w-auto px-2 select-none cursor-pointer mx-1 hover:bg-slate-700">
                Sebelumnya
              </div>
              <div className="rounded-sm bg-slate-500 text-white text-center w-auto px-2 select-none cursor-pointer mx-1 hover:bg-slate-700">
                Selanjutnya
              </div>
            </div>
          </div>
          <div className="flex justify-center w-1/12">
            <div
              className={`"w-1/12 h-4/6 flex flex-col justify-center p-4" ${
                isSurveyTable ? "" : "hidden"
              }`}
            >
              <img
                src={next}
                className="text-white w-16 h-auto select-none cursor-pointer"
                onClick={nextPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSurvey;
