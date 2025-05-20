import React, { useEffect, useState } from "react";
import { Validation } from "../../../services/verifikasi_data";
import { Navigate } from "react-router-dom";
import { urlLokalApi, lokalApi } from "../../../api/axios";

const KurasiSurvey = ({
  closeKurasiSurvey,
  switchDataSurvey,
  openDetailSurvey,
  isDetail,
  setGuid,
  setId,
}) => {
  if (!Validation()) {
    return <Navigate to="/login" />;
  }
  const [kurasiData, setKurasiData] = useState([]);

  const handleDetailSurvey = (guid, id) => {
    setGuid(guid);
    setId(id);
    // closeKurasiSurvey();
    openDetailSurvey();
  };

  const validasiRute = async (rute) => {
    try {
      const validasi = await lokalApi.get(`/rute/get/guid/${rute}`);
      if (
        validasi.data.data.COMPANY === "383c0103-76a6-4c12-bd84-499d4f8e2579"
      ) {
        return validasi.data.data.GUID;
      }
    } catch (error) {
    }
  };
  const fetchKurasiSurvey = async () => {
    setKurasiData([]);
    try {
      const AllKurasiRute = await getKurasiSurveyRute();

      if (AllKurasiRute?.data.success && AllKurasiRute?.data.data.length > 0) {
        AllKurasiRute.data.data.forEach(async (rute) => {
          // const validasi = await validasiRute(rute.guid_rute);
          // if (validasi != undefined) {
          //   getKurasiSurveyData(validasi);
          // }
          getKurasiSurveyData(rute.guid_rute);
        });
      } else {
        console.log("Tidak ada data rute yang ditemukan");
      }
    } catch (error) {
      console.error("Error fetching Kurasi survey:", error);
    }
  };

  const getKurasiSurveyData = async (guid_rute) => {
    try {
      const KurasiData = await lokalApi.get(
        `/final-report/get/kurasi/${guid_rute}`
      );
  
      const newSurvey = KurasiData.data.data;
      setKurasiData((prevData) => {
        const isDuplicate = prevData.some(
          (item) => item.guid_survey === newSurvey.guid_survey
        );
        if (!isDuplicate) {
          return [...prevData, newSurvey];
        } else {
          return prevData;
        }
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  

  const getKurasiSurveyRute = async () => {
    try {
      const RuteData = await lokalApi.get(`/final-report/getAll`);
      if (RuteData.data.success) {
        return RuteData;
      } else {
        console.error(RuteData.message);
        return null;
      }
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mendapatkan rute kurasi survey",
        error
      );
      return null;
    }
  };

  useEffect(() => {
    fetchKurasiSurvey();
  }, []);

  const DownloadReport = async (guid) => {
    // console.log("clicked!");
    try {
      const reportUrl = `${urlLokalApi}final-report/download/${guid}`;
  
      // Buka tab baru dengan URL
      window.open(reportUrl, '_blank', 'noopener,noreferrer');
  
      // Berikan feedback ke user
      alert("Laporan telah diunduh!");
    } catch (error) {
      console.error("Error saat mengunduh laporan:", error);
      alert("Gagal mengunduh laporan. Silakan coba lagi.");
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen overflow-hidden z-50">
      {/* mt-9 */}
      <div className="h-full select-none flex flex-col">
        <div className="flex justify-between z-50">
          <h1
            className="flex justify-center text-3xl w-8 ml-2 mt-2 text-white font-semibold cursor-pointer"
            onClick={closeKurasiSurvey}
          >
            X
          </h1>
        </div>
        <div className="flex w-9/12 mx-auto justify-between mb-2">
          <p className="text-2xl text-white select-none ml-6">KURASI SURVEY</p>
          <div className="flex mr-6 rounded-md overflow-clip">
            <div
              className="bg-white px-2 py-0 select-none cursor-pointer"
              onClick={switchDataSurvey}
            >
              Data Survey
            </div>
            <div className="bg-slate-500 px-2 py-0 text-white select-none cursor-pointer">
              Kurasi Survey
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-10 w-6/12 mx-auto overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {kurasiData.length > 0 ? (
            kurasiData.flat().map((data, index) => (
              <div
                key={index}
                className="bg-blue-600 flex flex-col w-full h-auto p-1 my-1"
              >
                <p className="text-white mx-1">
                  RUTE SURVEY: {data.rute?.toUpperCase() || "N/A"}
                </p>
                <div className="bg-white p-3 mx-1">
                  <p>GUID RUTE: {data.guid_rute || "N/A"}</p>
                  <p>Survey Terakhir Oleh: {data.surveyor || "N/A"}</p>
                  <p>Tanggal Terakhir Survey: {data.tanggal_survey || "N/A"}</p>
                  <p>Upload Gambar Oleh: {data.uploader || "N/A"}</p>
                  <p>Tanggal Upload terakhir: {data.tanggal_upload || "N/A"}</p>
                  <p>Video: {data.original_file_video || "N/A"}</p>
                  <p>Station: {data.station || "N/A"}</p>
                  <p>Kilometer: {data.kilometer || "N/A"}</p>
                  <div className="flex my-2">
                    <div
                      className="bg-green-400 hover:bg-green-600 px-2 rounded-md select-none cursor-pointer mr-2 text-white"
                      onClick={() => {
                      DownloadReport(data.guid_survey);
                      }}
                    >
                      Download Laporan
                    </div>
                    <div
                      className="bg-gray-500 hover:bg-gray-600 p-1 px-3 rounded-md select-none cursor-pointer text-white"
                      onClick={() =>
                        handleDetailSurvey(data.guid_survey, data.id)
                      }
                    >
                      Detail Survey
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white mx-auto">Memuat data kurasi survey...</p>
          )}
        </div>
        <div className="absolute bg-black opacity-60 h-full w-full -z-30"></div>
      </div>
    </div>
  );
};

export default KurasiSurvey;
