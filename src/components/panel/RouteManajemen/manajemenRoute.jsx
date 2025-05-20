import { useEffect, useState } from "react";
import { useHomePageLogic } from "../../../services/homepage";
import { Validation } from "../../../services/verifikasi_data";
import { Navigate } from "react-router-dom";
import Panel from "../PanelBtn";
import RouteTable from "./routeTable";
import TambahRute from "./addRute";
import DetailRute from "./detailRute";
import EditRute from "./editRute";
import DeleteRute from "./deleteRute";
import Fuse from "fuse.js";
import {
  getRuteData,
  getRuteDetail,
  deleteRutebyGuid,
  getRuteName,
} from "../../../services/ruteService";

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
  const [totalPage, setTotalPages] = useState(10);

  const closeAdd = () => setAddrute(false);
  const openAdd = () => setAddrute(true);
  const closeDetail = () => setDetailrute(false);
  const closeEdit = () => setEditrute(false);
  const closeDelete = () => {
    setGuid("");
    setDelete(false);
  };

  const openDetail = (guid) => {
    detailRute(guid);
    setDetailrute(true);
  };

  const openDelete = (guid) => {
    setGuid(guid);
    setDelete(true);
  };

  const confirmDelete = () => {
    deleteRute(guidSelected);
    setGuid("");
    fetchRute(currentPage);
    setDelete(false);
  };

  const openEdit = (guid) => {
    detailRute(guid);
    setEditrute(true);
  };

  const fetchRute = async (page) => {
    try {
      const result = await getRuteData(page);
      // console.table(result.data.data)
      if (result) {
        const newData = result.data.data || [];
        setDataRute((prevData) => {
          // Gabungkan data baru dengan data sebelumnya
          const combinedData = [...prevData, ...newData];
          // Hilangkan data duplikat berdasarkan atribut unik, misalnya `guid`
          const uniqueData = combinedData.filter(
            (value, index, self) =>
              index === self.findIndex((item) => item.GUID === value.GUID)
          );
          return uniqueData;
        });
        setCurrentPage(result.data.page || 1);
        setTotalPages(result.data.totalPage || 1);
      }
    } catch (error) {
      console.error("Error fetching rute data:", error);
    }
  };
  


  const detailRute = async (guid) => {
    try {
      const result = await getRuteDetail(guid);
      if (result) setDetailRute(result);
    } catch (error) {
      console.error("Error fetching rute data:", error);
    }
  };

  const deleteRute = async (guid) => {
    try {
      const result = await deleteRutebyGuid(guid);
      if (result) {
        alert("Rute berhasil dihapus");
        fetchRute(currentPage);
      }
    } catch (error) {
      console.error("Error deleting rute:", error);
    }
  };

  useEffect(() => {
    setmapsOpen(true);
    setrouteOpen(false);
    fetchRute(currentPage);
  }, [setmapsOpen, setrouteOpen, currentPage]);

  // scroll pagination
  const handleScrollEnd =()=>{
    fetchRute(currentPage+1);
  }

  return (
    <div className="h-screen pb-20 w-full">
      <div className="w-full h-3 bg-gray-200 select-none"></div>
      <div>
        <p className="text-xs mx-4 mb-2 select-none pointer-events-none">
          Dashboard&gt;Manajemen Rute
        </p>
      </div>
      <div className="mt-16 h-full pl-4 pr-0 py-3 select-none">
        <RouteTable
          openAdd={openAdd}
          openDetail={openDetail}
          openEdit={openEdit}
          openDelete={openDelete}
          dataRute={dataRute}
          onScrollEnd={handleScrollEnd}
        />
      </div>
      {Addrute && <TambahRute closeAdd={closeAdd} fetchRute={fetchRute} setDataRute={setDataRute}/>}
      {Detailrute && (
        <DetailRute routeDetail={detailRuteData} closeDetail={closeDetail} />
      )}
      {Editrute && (
        <EditRute routeDetail={detailRuteData} closeEdit={closeEdit} />
      )}
      {Deleterute && (
        <DeleteRute confirmDelete={confirmDelete} closeDelete={closeDelete} />
      )}
    </div>
  );
};

export default ManajemenRoute;
