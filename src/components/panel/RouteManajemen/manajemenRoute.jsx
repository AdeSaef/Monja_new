import { useEffect, useState } from "react";
import { useHomePageLogic } from "../../../services/homepage";
import { Validation } from "../../../services/verifikasi_data";
import Panel from "../PanelBtn";
import RouteTable from "./routeTable";
import TambahRute from "./addRute";
import DetailRute from "./detailRute";
import EditRute from "./editRute";
import DeleteRute from "./deleteRute";
import navigation from "../../../assets/button/navigation.png";
import { getRuteData, getRuteDetail, deleteRutebyGuid } from "../../../services/ruteService";

const ManajemenRoute = () => {
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
    setrouteOpen,
  } = useHomePageLogic();

  const [Addrute, setAddrute] = useState(false);
  const [Detailrute, setDetailrute] = useState(false);
  const [Editrute, setEditrute] = useState(false);
  const [dataRute, setDataRute] = useState([]);
  const [detailRuteData, setDetailRute] = useState({});
  const [guidSelected, setGuid] = useState("");
  const [Deleterute, setDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // Misalnya default 10 halaman

  const closeAdd = () => {
    setAddrute(false);
  };

  const openAdd = () => {
    setAddrute(true);
  };

  const closeDetail = () => {
    setDetailrute(false);
  };

  const closeEdit = () => {
    setEditrute(false);
  };

  const openDetail = (guid) => {
    detailRute(guid);
    setDetailrute(true);
  };

  const openDelete = (guid) => {
    console.log("delete select :",guid)
    setGuid(guid);
    setDelete(true);
  };

  const confirmDelete = () => {
    deleteRute(guidSelected);
    setGuid("");
    setDelete(false);
  };

  const closeDelete = () => {
    setGuid("");
    setDelete(false);
  };

  const openEdit = (guid) => {
    console.log("guid edit :", guid)
    detailRute(guid);
    setEditrute(true);
  };
  const handleSave = (formData) =>{
    console.log("saved : ",formData)
  }

  const fetchRute = async (page) => {
    try {
      const result = await getRuteData(page);
      // console.log("API Response:", result.data); // Debug log untuk memeriksa respons API
      // console.log("API Response page:", result.data.totalPage); // Debug log untuk memeriksa respons API
  
      if (result) {
        setDataRute(result.data.data || []); // Menyimpan data rute
        setCurrentPage(result.data.page || 1); // Menyimpan halaman saat ini
        setTotalPages(result.data.totalPage || 1); // Menyimpan total halaman
        // console.log("Total pages set to:", result.data.totalPage); // Debug log
      }
    } catch (error) {
      console.error("Error fetching rute data:", error);
    }
  };
  
  const detailRute = async (guid) => {
    try {
      const result = await getRuteDetail(guid);
  
      if (result) {
        setDetailRute(result); // Menyimpan data rute ke state
        console.log("Data rute detail yang diterima:", result);
      }
    } catch (error) {
      console.error("Error fetching rute data:", error);
    }
  };
  const deleteRute = async (guid) => {
    try {
      const result = await deleteRutebyGuid(guid);
  
      if (result) {
        console.log("Data berhasil dihapus :", result);
      }
    } catch (error) {
      console.error("Error fetching rute data:", error);
    }
  };
  

  useEffect(() => {
    setmapsOpen(true);
    setrouteOpen(false);
    fetchRute(currentPage);
  }, [setmapsOpen, setrouteOpen, currentPage]);

  const backPage = () => {
    if (currentPage > 1) {
      fetchRute(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      fetchRute(currentPage + 1);
    }
  };

  return (
    <div className="bg-stone-500 h-auto w-screen">
      <div>
        <p className="text-5xl pt-16 mx-4 mb-2 text-white select-none pointer-events-none">
          MANAJEMEN ROUTE
        </p>
      </div>
      <div className="bg-white h-auto px-20 py-3 select-none">
        <RouteTable
          openAdd={openAdd}
          openDetail={openDetail}
          openEdit={openEdit}
          openDelete={openDelete}
          dataRute={dataRute}
        />
        <div className="flex justify-end my-5">
          <div
            className={`flex flex-col justify-center ${
              currentPage === 1 ? "hidden" : ""
            }`}
          >
            <img
              src={navigation}
              className="transform rotate-180 h-5 w-8 cursor-pointer"
              onClick={backPage}
            />
          </div>
          <div className="w-6 border border-gray-300 rounded-xl mx-2 text-center py-1">
            {currentPage}
          </div>
          <div
            className={`flex flex-col justify-center ${
              currentPage >= totalPages ? "hidden" : ""
            }`}
          >
            <img
              src={navigation}
              className="h-5 w-8 cursor-pointer"
              onClick={nextPage}
              alt="Next Page"
            />
          </div>
        </div>
      </div>
      {Addrute && <TambahRute closeAdd={closeAdd} />}
      {Detailrute && (
        <DetailRute routeDetail={detailRuteData} closeDetail={closeDetail} />
      )}
      {Editrute && (
        <EditRute routeDetail={detailRuteData} closeEdit={closeEdit} />
      )}
      {Deleterute && (
        <DeleteRute confirmDelete={confirmDelete} closeDelete={closeDelete} />
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
