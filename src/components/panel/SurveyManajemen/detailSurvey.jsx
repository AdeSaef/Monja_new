import { useEffect, useState } from "react";
import { getSurveybyId } from "../../../services/surveyService";

const DetailTable = ({ data }) => {
  console.table(data);
  return (
    <div className="container mx-auto ">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="p-1 border">No.</th>
            <th className="p-1 border">GUID Survey</th>
            <th className="p-1 border">GUID Ruas</th>
            <th className="p-1 border">Ruas</th>
            <th className="p-1 border">Nama File Video</th>
            <th className="p-1 border">Surveyor</th>
            <th className="p-1 border">Tanggal Survey</th>
            <th className="p-1 border">Uploader</th>
            <th className="p-1 border">Tanggal Upload</th>
            <th className="p-1 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((survey, index) => (
              <tr key={index} className="text-center border-b">
                <td className="p-1 border">{index + 1}</td>
                <td className="p-1 border">
                  {survey.guid_survey || "-"}
                </td>
                <td className="p-1 border">
                  {survey.guid_rute || "-"}
                </td>
                <td className="p-1 border">{survey.rute || "-"}</td>
                <td className="p-1 border">
                  {survey.namafiles || "-"}
                </td>
                <td className="p-1 border">{survey.surveyor || "-"}</td>
                <td className="p-1 border">
                  {survey.tanggal_survey || "-"}
                </td>
                <td className="p-1 border">{survey.uploader || "-"}</td>
                <td className="p-1 border">
                  {survey.tanggal_upload || "-"}
                </td>
                <td
                  className={`p-1 border ${
                    survey.status === "UPLOADED"
                      ? "bg-green-200 text-green-700"
                      : survey.status === "REPORTED"
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {survey.status || "Unknown"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="py-4 text-center text-gray-500">
                Data tidak tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const DetailSurvey = ({ onClose, surveyId }) => {
  const [detailSurvey, setDetailSurvey] = useState([]);

  useEffect(() => {
    const fetchSurveyDetail = async () => {
      try {
        const surveyDetail = await getSurveybyId(surveyId);
        setDetailSurvey(surveyDetail);
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };
    fetchSurveyDetail();
  }, [surveyId]);

  return (
    <div className="container z-50" onClick={onClose}>
      <div
        className="fixed top-0 left-0 min-h-full w-full bg-gray-700 opacity-70 p-0"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 left-0 h-screen w-screen min-h-full max-w-none flex flex-col py-auto z-50 overflow-hidden">
        <div>
          <h1
            className="text-3xl text-white font-semibold z-50 cursor-pointer mt-5 ml-5"
            onClick={onClose}
          >
            X
          </h1>
        </div>
        <div>
          <h1 className="text-3xl text-white font-semibold ml-11 z-50">
            DETAIL MANAJEMEN SURVEY
          </h1>
        </div>
        <div className="mt-5 border-4 border-gray-500 bg-white rounded-3xl mx-auto h-auto overflow-x-scroll scrollbar-thin p-0">
          <DetailTable data={detailSurvey} className="w-full z-50" />
        </div>
        <div className="flex mt-3 ml-40">
          <button className="bg-gray-400 mx-1 px-5 text-white rounded-sm hover:bg-gray-500">
            sebelumnya
          </button>
          <button className="bg-gray-400 mx-1 px-5 text-white rounded-sm hover:bg-gray-500">
            selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSurvey;
