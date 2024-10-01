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
    <div className="absolute top-0 left-0 h-screen w-screen z-50 overflow-hidden">
      <div className="absolute top-4 left-4">
        <h1 className="text-4xl ml-2 mt-2 font-bold z-50 cursor-pointer">X</h1>
      </div>
      <div className=" bg-white h-full mt-20 select-none flex flex-col">
        <div className="flex w-full h-96">
          <div className="bg-black w-5/12 min-h-96 flex flex-col justify-center py-8 mx-3">
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src="https://monitoring.pptik.id/data/road_coba/gambar/GX010361.MP4_11092024_4.jpg"
                alt="Survey Image"
              />
            </div>
          </div>
          <div className="w-2/12 bg-white h-96 overflow-hidden overflow-y-scroll flex flex-col scrollbar-thin">
            <div className="border border-gray w-full min-h-12 flex justify-between px-1">
              <span className="my-auto">0+20</span>
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
          <div className="w-5/12 bg-white h-full p-4 pt-2 flex flex-col">
            <div className="border border-gray-300 border-t-0 h-full flex flex-col p-3">
              <span className="text-xl font-bold">Detail Survey</span>
              <div className="w-full h-auto border border-gray-300 p-4">
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Surveyor</div>
                  <div className="border-2 w-full h-auto px-2">John Doe</div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">
                    Tanggal Survey
                  </div>
                  <div className="border-2 w-full h-auto px-2">2022-01-01</div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Uploader</div>
                  <div className="border-2 w-full h-auto px-2">Jane Doe</div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">
                    Tanggal Upload
                  </div>
                  <div className="border-2 w-full h-auto px-2">2022-01-02</div>
                </div>
                <div className="border-t-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Station</div>
                  <div className="border-2 w-full h-auto px-2">10</div>
                </div>
                <div className="border-y-2 w-full h-auto flex p-1">
                  <div className="w-1/2 h-auto font-semibold">Kilometer</div>
                  <div className="border-2 w-full h-auto px-2">10.5</div>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 border-b-0 w-full h-auto p-3 mt-3 flex justify-center">
              <div className="bg-green-500 w-20 h-auto rounded-md text-white text-center select-none hover:bg-green-600">
                Detail
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-auto">
          <div className="mx-3 w-5/12 flex flex-wrap overflow-y-scroll scrollbar-thin">
            <div className="flex w-1/2 h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-full"></div>
            </div>
            <div className="flex w-1/2 h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-full"></div>
            </div>
            <div className="flex w-1/2 h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-full"></div>
            </div>
            <div className="flex w-1/2 h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-full"></div>
            </div>
            <div className="flex w-1/2 h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-full"></div>
            </div>
            <div className="flex w-1/2 h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-full"></div>
            </div>
            <div className="flex w-1/2 h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-full"></div>
            </div>
            <div className="flex w-1/2 h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-full"></div>
            </div>
            <div className="flex w-1/2 h-24 bg-slate-300 p-1">
              <div className="bg-white h-full w-full"></div>
            </div>
          </div>
          <div className="w-1/2 h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailKurasiSurvey;
