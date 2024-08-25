import { useEffect, useState } from "react";
import { useHomePageLogic } from "../../../services/homepage";
import Panel from "../PanelBtn";
import RouteTable from "./routeTable";
import TambahRute from "./addRute";
import DetailRute from "./detailRute";

const ManajemenRoute = () => {
  const {
    mapsOpen,
    ismapsOpen,
    surveyOpen,
    issurveyOpen,
    routeOpen,
    isrouteOpen,
    setmapsOpen,
    setrouteOpen,
  } = useHomePageLogic();

  const [Addrute, setAddrute] = useState(false);
  const [Detailrute, setDetailrute] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null); // State untuk menyimpan rute yang dipilih

  const closeAdd = () => {
    setAddrute(false);
  };

  const openAdd = () => {
    setAddrute(true);
  };

  const closeDetail = () => {
    setDetailrute(false);
    setSelectedRoute(null); // Reset selected route
  };

  const openDetail = (route) => {
    console.log("Route sebelum setState:", route); // Debugging
    setSelectedRoute(route); // Set rute yang dipilih
    setDetailrute(true);
  };

  useEffect(() => {
    setmapsOpen(true);
    setrouteOpen(false);
  }, [setmapsOpen, setrouteOpen]);


  return (
    <div className="bg-stone-500 h-screen w-screen">
      <div>
        <p className="text-5xl pt-16 mx-4 mb-2 text-white">MANAJEMEN ROUTE</p>
      </div>
      <div className="bg-white h-auto px-20 py-3">
        <RouteTable openAdd={openAdd} openDetail={openDetail} />
        <div className="flex justify-end my-5">
          <div className="flex flex-col justify-center">before</div>
          <div className="w-6 border border-black rounded-xl mx-2 p-2">3</div>
          <div className="flex flex-col justify-center">after</div>
        </div>
      </div>
      {Addrute && <TambahRute closeAdd={closeAdd} />}
      {Detailrute && (
        <DetailRute routeDetail={selectedRoute} closeDetail={closeDetail} />
      )}
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

export default ManajemenRoute;
