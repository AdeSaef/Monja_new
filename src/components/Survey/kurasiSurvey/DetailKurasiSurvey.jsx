import React, { useRef, useEffect, useState } from "react";
import { Validation } from "../../../services/verifikasi_data";
import {
  getDetailSurvey,
  getSurveyData,
  getSurveybyId,
} from "../../../services/surveyService";
import { lokalApi, urlImageApi } from "../../../api/axios";

const DetailKurasiSurvey = ({
  setDetail,
  guidsurvey,
  idKurasi,
  MoreDetailOpen,
  closeKurasiSurvey,
}) => {
  if (!Validation()) {
    return <Navigate to="/login" />;
  }

  const [detail, setDetailKurasi] = useState({});
  const [data, setData] = useState([]);
  const [Eachdata, setEachData] = useState({});
  const [idkurasi, setIdKurasi] = useState(idKurasi);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  // const backPage = () => {
  //   if (currentPage > 1) {
  //     getEachDataKurasi(guidsurvey, currentPage - 1);
  //   }
  // };

  // const nextPage = () => {
  //   if (currentPage < totalPages) {
  //     getEachDataKurasi(guidsurvey, currentPage + 1);
  //   }
  // };

  const getListKurasi = async (guidsurvey) => {
    try {
      const DetailKurasi = await lokalApi.get(
        `/final-report/get/guid_survey/${guidsurvey}`
      );
      setData(DetailKurasi.data.data);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  const getEachDataKurasi = async (guidsurvey, page) => {
    guidsurvey = guidsurvey.trim();
    try {
      const EachKurasi = await lokalApi.get(
        `/final-report/query/${guidsurvey}?page=${page}`
      );
      // console.log(EachKurasi);
      setEachData(EachKurasi.data.data);
      setTotalPages(EachKurasi.data.totalPage);
      setCurrentPage(EachKurasi.data.page);
      // console.log(EachKurasi.data.page);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  const getKurasiDetail = async (kurasiId) => {
    try {
      const KurasiDetail = await getDetailSurvey(kurasiId);
      setDetailKurasi(KurasiDetail);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  const closeDetail = () => {
    setDetail(false);
  };

  const onDetailKurasi = (id) => {
    getKurasiDetail(id);
  };
  const onDetail = (id) => {
    closeKurasiSurvey();
    closeDetail();
    MoreDetailOpen(id);
  };
  useEffect(() => {
    getListKurasi(guidsurvey);
    getEachDataKurasi(guidsurvey, 1);
    getKurasiDetail(idkurasi);
    // console.log(detail);
  }, []);

   // scroll pagination
   const handleScrollEnd = () => {
    getEachDataKurasi(guidsurvey,currentPage + 1);
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
    <div className="absolute top-0 left-0 h-screen w-full z-50 overflow-hidden bg-white">
      {/* <div className="absolute top-0 left-4">
        <h1
          className="text-4xl ml-2 font-bold z-50 select-none cursor-pointer"
          onClick={closeDetail}
        >
          X
        </h1>
      </div> */}
      <div className=" h-full select-none flex flex-col border border-t-2">
        <div className="flex w-full h-80">
          <div className="bg-black w-5/12 h-full flex flex-col justify-center py-8 mx-3">
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src={`${urlImageApi}/${detail.namafile}`}
                alt="Survey Image"
              />
            </div>
          </div>
          <div className="w-2/12 bg-white h-80 overflow-hidden overflow-y-scroll flex flex-col scrollbar-thin">
            {data.map((item, index) => (
              <div
                key={item.id}
                className="border border-gray w-full min-h-12 flex justify-between px-1 select-none cursor-pointer"
                onClick={() => {
                  onDetailKurasi(item.id);
                  console.log(currentPage);
                }}
              >
                <span className="my-auto">{`0+${(index + 1) * 25}`}</span>
                {/* <div className=" h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                    form terisi
                  </div> */}
                <div
                  className={`${
                    item.FORM_SURVEY.CEK_STATUS_ENTRY
                      ? "bg-green-400 w-16"
                      : "bg-red-600 w-24"
                  } h-4 rounded-md flex flex-col my-auto text-white text-xs text-center`}
                >
                  {item.FORM_SURVEY.CEK_STATUS_ENTRY
                    ? "form terisi"
                    : "form belum terisi"}
                </div>
              </div>
            ))}
          </div>
          <div className="w-5/12 bg-white h-full p-2 pt-2 flex flex-col">
            <div className="border border-gray-300 border-t-0 h-full flex flex-col p-2">
              <span className="text-xl font-bold">Detail Survey</span>
              <div className="w-full h-auto border border-gray-300 p-2">
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Surveyor</div>
                  <div className="border-2 w-full h-auto px-2">
                    {detail.surveyor}
                  </div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">
                    Tanggal Survey
                  </div>
                  <div className="border-2 w-full h-auto px-2">
                    {detail.tanggal_survey}
                  </div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Uploader</div>
                  <div className="border-2 w-full h-auto px-2">
                    {detail.uploader}
                  </div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">
                    Tanggal Upload
                  </div>
                  <div className="border-2 w-full h-auto px-2">
                    {detail.tanggal_upload}
                  </div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Station</div>
                  <div className="border-2 w-full h-auto px-2">
                    {detail.station}
                  </div>
                </div>
                <div className="border-y-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Kilometer</div>
                  <div className="border-2 w-full h-auto px-2">
                    {detail.kilometer}
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 border-b-0 w-full h-auto p-3 mt-3 flex justify-center">
              <div
                className="bg-green-500 w-20 z-50 h-auto rounded-md text-white text-center select-none hover:bg-green-600 cursor-pointer"
                onClick={() => {
                  onDetail(detail.id);
                }}
              >
                Detail
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-auto">
          <div className="w-5/12 h-full flex flex-col">
            <div ref={divRef} className="mx-3 w-full bg-white flex flex-wrap overflow-y-scroll scrollbar-thin h-1/2">
              {Eachdata.length > 0 ? (
                Eachdata.map((item) => (
                  <div
                    key={item.id}
                    className="w-1/2 h-auto p-1 cursor-pointer"
                    onClick={() => {
                      onDetailKurasi(item.id);
                    }}
                  >
                    <div className="flex w-full h-full border-2 border-slate-300 p-1 flex-col mb-4">
                      <img
                        className="w-full h-auto object-cover"
                        src={`${urlImageApi}/${item.namafile}`}
                        alt={`Survey Image ${item.id}`}
                      />
                      <div className="flex flex-col my-2">
                        <div className="flex mx-1">
                          <div className="flex flex-col w-full">
                            <p className="text-gray-600 text-sm">Surveyor</p>
                            <p className="font-semibold">{item.surveyor}</p>
                          </div>
                          <div className="flex flex-col w-full">
                            <p className="text-gray-600 text-sm">Uploader</p>
                            <p className="font-semibold">{item.uploader}</p>
                          </div>
                        </div>
                        <div className="flex mx-1 my-2">
                          <div className="flex flex-col w-full">
                            <p className="text-gray-600 text-sm">
                              Tanggal Survey
                            </p>
                            <p className="font-semibold">
                              {item.tanggal_survey}
                            </p>
                          </div>
                          <div className="flex flex-col w-full">
                            <p className="text-gray-600 text-sm">
                              Tanggal Upload
                            </p>
                            <p className="font-semibold">
                              {item.tanggal_upload}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Data tidak tersedia</p>
              )}
            </div>
            {/* <div className="w-full h-auto flex pl-2 mb-6">
              <div
                className={`bg-gray-500 select-none text-sm w-full mx-2 my-2 py-1 text-center rounded-md ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-white cursor-pointer hover:bg-gray-700"
                }`}
                onClick={currentPage > 1 ? backPage : null}
              >
                Sebelumnya
              </div>

              <div
                className={`bg-gray-500 select-none text-sm w-full mx-2 my-2 py-1 text-center rounded-md ${
                  currentPage >= totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-white cursor-pointer hover:bg-gray-700"
                }`}
                onClick={currentPage < totalPages ? nextPage : null}
              >
                Selanjutnya
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailKurasiSurvey;
