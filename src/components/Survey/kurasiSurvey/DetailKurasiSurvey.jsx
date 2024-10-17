import React, { useEffect, useState } from "react";
import { Validation } from "../../../services/verifikasi_data";
import { getDetailSurvey, getSurveyData, getSurveybyId } from "../../../services/surveyService";
import { lokalApi } from "../../../api/axios";

const DetailKurasiSurvey = ({ setDetail, guidsurvey, idKurasi, MoreDetailOpen, closeKurasiSurvey }) => {
  if (!Validation()) {
    return <Navigate to="/login" />;
  }

  const [data, setData] = useState({});
  const [detail, setDetailKurasi] = useState({});
  const [idkurasi, setIdKurasi] = useState(idKurasi);

  const getSurveyDetailKurasi = async (guidsurvey) => {
    try {
      const DetailKurasi = await lokalApi.get(
        `/final-report/get/guid_survey/${guidsurvey}`
      );
      setData(DetailKurasi.data.data);
    } catch {
      console.error("Error fetching survey data:", error);
    }
  };
  const getKurasiDetail =async (kurasiId)=>{
    try{
      const KurasiDetail = await getDetailSurvey(kurasiId);
      // console.log(KurasiDetail);
      setDetailKurasi(KurasiDetail);
      // console.log(detail);
    }catch{
      console.error("Error fetching survey data:", error);
    }
  }

  const closeDetail = () => {
    setDetail(false);
  };

  const onDetailKurasi=(id)=>{
    getKurasiDetail(id);
  };
  const onDetail=(id)=>{
    closeKurasiSurvey();
    MoreDetailOpen(id);
  }
  useEffect(() => {
    getSurveyDetailKurasi(guidsurvey);
    getKurasiDetail(idkurasi);
    // console.log("detail",detail);
  }, []);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen z-50 overflow-hidden">
      <div className="absolute top-0 left-4">
        <h1
          className="text-4xl ml-2 font-bold z-50 select-none cursor-pointer"
          onClick={closeDetail}
        >
          X
        </h1>
      </div>
      <div className=" bg-white h-full mt-9 select-none flex flex-col border border-t-2">
        <div className="flex w-full h-80">
          <div className="bg-black w-5/12 h-full flex flex-col justify-center py-8 mx-3">
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src={`https://monitoring.pptik.id/data/road_coba/gambar/${detail.namafile}`}
                alt="Survey Image"
              />
            </div>
          </div>
          <div className="w-2/12 bg-white h-80 overflow-hidden overflow-y-scroll flex flex-col scrollbar-thin">
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+25</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+50</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+75</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+100</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+150</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+200</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+250</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+300</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+350</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+400</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+450</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+500</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+550</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+600</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+650</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+700</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+750</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+800</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+850</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+900</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+950</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+1000</span>
              <div className="bg-green-400 w-16 h-4 rounded-md flex flex-col my-auto text-white text-xs text-center">
                form terisi
              </div>
            </div>
          </div>
          <div className="w-5/12 bg-white h-full p-2 pt-2 flex flex-col">
            <div className="border border-gray-300 border-t-0 h-full flex flex-col p-2">
              <span className="text-xl font-bold">Detail Survey</span>
              <div className="w-full h-auto border border-gray-300 p-2">
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Surveyor</div>
                  <div className="border-2 w-full h-auto px-2">{detail.surveyor}</div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">
                    Tanggal Survey
                  </div>
                  <div className="border-2 w-full h-auto px-2">{detail.tanggal_survey}</div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Uploader</div>
                  <div className="border-2 w-full h-auto px-2">{detail.uploader}</div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">
                    Tanggal Upload
                  </div>
                  <div className="border-2 w-full h-auto px-2">{detail.tanggal_upload}</div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Station</div>
                  <div className="border-2 w-full h-auto px-2">{detail.station}</div>
                </div>
                <div className="border-y-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Kilometer</div>
                  <div className="border-2 w-full h-auto px-2">{detail.kilometer}</div>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 border-b-0 w-full h-auto p-3 mt-3 flex justify-center">
              <div className="bg-green-500 w-20 z-50 h-auto rounded-md text-white text-center select-none hover:bg-green-600 cursor-pointer" onClick={()=>{onDetail(detail.id)}}>
                Detail
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-full">
          <div className="mx-3 w-5/12 bg-white flex flex-wrap overflow-y-scroll scrollbar-thin h-60">
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="w-1/2 h-auto p-1 cursor-pointer" onClick={()=>{onDetailKurasi(item.id)}}>
                  <div className="flex w-full h-full border-2 border-slate-300 p-1 flex-col mb-4">
                    <img
                      className="w-full h-auto object-cover"
                      src={`https://monitoring.pptik.id/data/road_coba/gambar/${item.namafile}`}
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
                          <p className="font-semibold">{item.tanggal_survey}</p>
                        </div>
                        <div className="flex flex-col w-full">
                          <p className="text-gray-600 text-sm">
                            Tanggal Upload
                          </p>
                          <p className="font-semibold">{item.tanggal_upload}</p>
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
        </div>
      </div>
    </div>
  );
};

export default DetailKurasiSurvey;
