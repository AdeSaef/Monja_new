import React from "react";

const Panel = ({ mapsOpen, ismapsOpen, routeOpen, isrouteOpen, surveyOpen, issurveyOpen }) => {
  return (
    <>
      <div className="flex space-x-1 h-8 mb-2 transform scale-100">
        <div
          className={`select-none px-1 w-full h-full text-center cursor-pointer ${ismapsOpen? "bg-gradient-to-t from-blue-200 to-white":"bg-white text-black"} whitespace-nowrap`}
          onClick={mapsOpen}
        >
          Maps
        </div>

        <div className={`select-none px-1 w-full h-full text-center cursor-pointer ${isrouteOpen? "bg-gradient-to-t from-blue-200 to-white":"bg-white text-black"} whitespace-nowrap`} onClick={routeOpen}>
          Manajemen Rute
        </div>
        <div className={`select-none px-1 w-full h-full text-center cursor-pointer ${issurveyOpen? "bg-gradient-to-t from-blue-200 to-white":"bg-white text-black"} whitespace-nowrap`} onClick={surveyOpen}>
          Manajemen Survey
        </div>
      </div>
    </>
  );
};

export default Panel;
