import { useState } from "react";
import tunnel from "../../assets/tunnel.png";

const SurveyBtn = ({isOff, isRotated, surveyMenu, openDataSurvey}) => {
    return(
        <>
        <div
            className={`flex flex-col absolute top-10 -left-16 w-auto h-auto transition-all duration-500 transform ${
              isOff ? "opacity-100 translate-x-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="border select-none text-center whitespace-nowrap p-1 bg-white cursor-pointer" onClick={openDataSurvey}>
              Data Survey
            </div>
            <div className="border select-none border-t-0 text-center whitespace-nowrap p-1 bg-white">
              Kurasi Survey
            </div>
          </div>
          <div className="w-1/12 min-w-8 h-full mx-1 select-none">
            <img
              src={tunnel}
              className={`w-full h-full transform transition-transform duration-500 ease-in-out ${
                isRotated ? "-rotate-90" : ""
              } cursor-pointer`}
              onClick={surveyMenu}
            />
          </div>
          </>
    );
}

export default SurveyBtn;