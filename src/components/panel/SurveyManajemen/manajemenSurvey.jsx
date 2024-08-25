import { useEffect, useState } from "react";
import { useHomePageLogic } from "../../../services/homepage";
import Panel from "../PanelBtn";
import React from "react";
import DetailSurvey from "./detailSurvey";
import {surveyData} from "./surveyDataEx";

const SurveyTable = ({ data, onDetail }) => (
    <div className="overflow-x-auto z-50">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left border-2 border-gray-200  text-lg font-medium  uppercase tracking-wider">No.</th>
            <th className="px-6 py-3 text-left border-2 border-gray-200  text-lg font-medium  uppercase tracking-wider">Rute</th>
            <th className="px-6 py-3 text-left border-2 border-gray-200  text-lg font-medium  uppercase tracking-wider">Tanggal</th>
            <th className="px-6 py-3 text-left border-2 border-gray-200  text-lg font-medium uppercase tracking-wider">Surveyor</th>
            <th className="px-6 py-3 text-left border-2 border-gray-200  text-lg font-medium uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-lg font-medium">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md">{item.rute}</td>
              <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md">{item.tanggal}</td>
              <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md">{item.surveyor}</td>
              <td className="px-6 py-4 whitespace-nowrap border-2 border-gray-200 text-md font-medium">
                <button
                  className="text-white bg-blue-600 rounded-md px-4 hover:bg-blue-700 cursor-pointer"
                  onClick={() => onDetail(item.id)}
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
  

const ManajemenSurvey = () => {
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

  const handleDetailSurvey = (id) => {
    setSelectedSurveyId(id);
    setDetailSurvey(true);
  };

  const closeDetailSurvey = () => {
    setDetailSurvey(false);
    setSelectedSurveyId(null);
  };

  useEffect(() => {
    setmapsOpen(true);
    setsurveyOpen(false);
  }, [setmapsOpen, setsurveyOpen]);

  return (
    <div className="bg-stone-500 h-screen w-screen">
      <div>
        <p className="text-5xl pt-16 mx-4 mb-2 text-white">MANAJEMEN SURVEY</p>
      </div>
      <div className="bg-white h-auto px-20 py-3">
        <div className="border-4 border-gray-600 rounded-3xl h-auto overflow-clip">
          <SurveyTable data={surveyData} onDetail={handleDetailSurvey} />
        </div>
        <div className="flex justify-end my-5">
          <div className="flex flex-col justify-center">before</div>
          <div className="w-6 border border-black rounded-xl mx-2 p-2">3</div>
          <div className="flex flex-col justify-center">after</div>
        </div>
      </div>
      {detailSurvey && (
        <DetailSurvey onClose={closeDetailSurvey} surveyId={selectedSurveyId} />
      )}
      {/* panel */}
      <div className="w-1/3 absolute top-1 right-0 z-10">
        <div className="flex h-8">
          <div className="w-1/12 mx-1 select-none"></div>
          <div className="px-1 w-full h-auto z-50">
            <Panel
              mapsOpen={mapsOpen}
              ismapsOpen={ismapsOpen}
              surveyOpen={surveyOpen}
              issurveyOpen={issurveyOpen}
              routeOpen={routeOpen}
              isrouteOpen={isrouteOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenSurvey;
