import React, { useRef, useEffect, useState } from "react";
import { Validation } from "../../../services/verifikasi_data";
import { getSurveyData } from "../../../services/surveyService";
import { getSurveybyId } from "../../../services/surveyService";
import next from "../../../assets/button/next.png";
import back from "../../../assets/button/back.png";

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

const SurveyTable = ({ data, onDetail }) => (
  <div className="z-50 w-10/12 mx-auto pb-56">
    {/* Header row */}
    <div className="flex">
      <div className="w-1/12 text-center text-lg text-white font-medium tracking-wider">
        No
      </div>
      <div className="w-4/12 text-center text-lg text-white font-medium tracking-wider">
        Ruas
      </div>
      <div className="w-3/12 text-center text-lg text-white font-medium tracking-wider">
        Tanggal
      </div>
      <div className="w-2/12 text-center text-lg text-white font-medium tracking-wider">
        Surveyor
      </div>
      <div className="w-2/12 text-center text-lg text-white font-medium tracking-wider">
        Aksi
      </div>
    </div>

    {/* Data rows */}
    {data.map((item, index) => (
      <div
        key={item.guid_survey}
        className="flex items-center bg-white my-1 border-2 rounded-lg overflow-hidden"
      >
        <div className="w-1/12 px-6 py-1 whitespace-nowrap text-lg text-center font-medium">
          {index + 1}
        </div>
        <div className="w-4/12 px-6 py-1 whitespace-nowrap text-md">
          {item.rute}
        </div>
        <div className="w-3/12 px-6 py-1 whitespace-nowrap text-md">
          {item.tanggal_survey}
        </div>
        <div className="w-2/12 px-6 py-1 whitespace-nowrap text-md">
          {item.surveyor}
        </div>
        <div className="w-2/12 px-6 py-1 whitespace-nowrap text-md font-medium">
          <button
            className="text-white bg-blue-600 rounded-md px-4 hover:bg-blue-700 cursor-pointer"
            onClick={() => onDetail(item.guid_survey)}
          >
            Detail
          </button>
        </div>
      </div>
    ))}
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
      // console.table(surveyDetail);
      setDetailDataSurvey(surveyDetail);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  const fetchSurvey = async (page) => {
    try {
      const survey = await getSurveyData(page);
      console.table(survey);
      if (survey) {
        const newData = survey.data || [];
        setDataSurvey((prevData) => {
          // Gabungkan data baru dengan data sebelumnya
          const combinedData = [...prevData, ...newData];
          // Hilangkan data duplikat berdasarkan atribut unik, misalnya `guid`
          const uniqueData = combinedData.filter(
            (value, index, self) =>
              index ===
              self.findIndex((item) => item.guid_survey === value.guid_survey)
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
    <div className="fixed top-0 left-0 h-screen w-screen overflow-clip z-50">
      {/* mt-9 */}
      <div className="h-full select-none flex flex-col">
        {/* top-9 */}
        <div className="fixed bg-black opacity-60 top-0 left-0 w-full h-full -z-10"></div>
        <div className="z-50 flex">
          <h1
            className="flex justify-center text-3xl w-8 ml-2 mt-2 text-white font-semibold cursor-pointer"
            onClick={isSurveyTable ? closeDataSurvey : closeDetailDataSurvey}
          >
            X
          </h1>
          <div className="flex w-9/12 mx-auto justify-between mb-2 mt-4 z-50">
            <p className="text-2xl text-white font-bold select-none ml-6">
              {isSurveyTable ? "DATA SURVEY" : "DETAIL SURVEY"}
            </p>
            <div className="flex mr-6 rounded-md overflow-clip">
              <div className="bg-slate-500 px-2 py-0 text-white select-none cursor-pointer">
                Data Survey
              </div>
              <div
                className="bg-white px-2 py-0 select-none cursor-pointer"
                onClick={switchKurasiSurvey}
              >
                Kurasi Survey
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex w-9/12 mx-auto justify-between mb-2 z-50">
          <p className="text-2xl text-white font-bold select-none ml-6">
            {isSurveyTable ? "DATA SURVEY" : "DETAIL SURVEY"}
          </p>
          <div className="flex mr-6 rounded-md overflow-clip">
            <div className="bg-slate-500 px-2 py-0 text-white select-none cursor-pointer">
              Data Survey
            </div>
            <div
              className="bg-white px-2 py-0 select-none cursor-pointer"
              onClick={switchKurasiSurvey}
            >
              Kurasi Survey
            </div>
          </div>
        </div> */}
        <div className="flex w-full justify-center mx-auto">
          {/* <div className="flex justify-center w-1/12">
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
          </div> */}
          <div className="flex flex-col w-full">
            <div
              className={`overflow-clip  flex flex-col ${
                isSurveyTable ? "h-6/6" : ""
              }`}
            >
              <div
                ref={divRef}
                className={`h-screen ${
                  isSurveyTable ? "overflow-y-scroll scrollbar-thin" : ""
                }`}
              >
                {isSurveyTable ? (
                  <SurveyTable
                    data={dataSurvey}
                    onDetail={handleDetailDataSurvey}
                    onScrollEnd={handleScrollEnd}
                  />
                ) : (
                  <DetailTable data={detailDataSurvey} />
                )}
              </div>
            </div>
            <div className={`ml-2 mt-2 flex ${isSurveyTable ? "hidden" : ""}`}>
              <div className="rounded-sm bg-slate-500 text-white text-center w-auto px-2 select-none cursor-pointer mx-1 hover:bg-slate-700">
                Sebelumnya
              </div>
              <div className="rounded-sm bg-slate-500 text-white text-center w-auto px-2 select-none cursor-pointer mx-1 hover:bg-slate-700">
                Selanjutnya
              </div>
            </div>
          </div>
          {/* <div className="flex justify-center w-1/12">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DataSurvey;
