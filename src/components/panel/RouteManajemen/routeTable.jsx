import React, { useRef, useState, useEffect } from "react";
import Fuse from "fuse.js";
import { getRuteDetail, getRuteName } from "../../../services/ruteService";
import { IoMdSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const RouteTable = ({
  openAdd,
  openDetail,
  openDelete,
  openEdit,
  dataRute,
  onScrollEnd,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [guidSelected, setGuid] = useState("");
  const [search, setSearch] = useState(false);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [ruteName, setRuteName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [ruteDetail, setRuteDetail] = useState({});

  let fuse;

  // scroll pagination
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
          onScrollEnd(); // Panggil aksi ketika pengguna menggulir lebih jauh
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
  }, [onScrollEnd]);

  // Fetch data rute
  const fetchRute = async () => {
    setLoading(true);
    try {
      const survey = await getRuteName();
      const ruteData = survey.data;
      setRuteName(ruteData);
      setFilteredRoutes(ruteData);
      initializeFuse(ruteData);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize Fuse.js
  const initializeFuse = (data) => {
    const fuse = new Fuse(data, {
      keys: ["NAMA_RUAS_JALAN"],
      threshold: 0.4,
    });
    setFilteredRoutes(fuse.search(inputValue).map((result) => result.item));
  };
  // Filter data berdasarkan inputValue
  useEffect(() => {
    if (inputValue === "") {
      setFilteredRoutes(ruteName);
      setGuid("");
      setResult(false);
    } else {
      initializeFuse(ruteName);
    }
  }, [inputValue, ruteName]);

  useEffect(() => {
    fetchRute();
  }, []);

  // Handle perubahan input pencarian
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle pemilihan rute
  const handleRouteChange = (namaRuas, guid) => {
    setSelected(namaRuas);
    setGuid(guid);
    setInputValue(namaRuas);
    setSearch(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const findResult = await getRuteDetail(guidSelected);
      if (findResult) {
        setRuteDetail(findResult);
        setResult(true);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error fetching rute detail:", error);
    }
  };
  return (
    <div
      className="container mx-auto pl-4"
      // onClick={() => {
      //   setSearch(false);
      // }}
    >
      <div>
        <form className="flex w-full" onSubmit={handleSubmit}>
          <div className="relative w-full flex flex-col">
            <input
              type="text"
              className="border h-8 rounded-full w-full mr-4 px-4"
              placeholder="Cari Rute..."
              value={inputValue}
              // onClick={()=>{setSearch(true)}}
              onFocus={() => setSearch(true)}
              onBlur={() => setSearch(false)}
              onChange={handleInputChange}
            />

            <ul
              className={`bg-white absolute z-10 mx-3 top-10 left-0 right-0 overflow-y-auto ${
                search && filteredRoutes && filteredRoutes.length > 0
                  ? "max-h-40"
                  : "max-h-0 border-none"
              } transition-all duration-300 border rounded-lg border-gray-700`}
            >
              {filteredRoutes.map((route) => (
                <li
                  key={route.NAMA_RUAS_JALAN}
                  className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${
                    route.NAMA_RUAS_JALAN.toLowerCase() ===
                      selected.toLowerCase() && "bg-sky-600 text-white"
                  }`}
                  onClick={() =>
                    handleRouteChange(route.NAMA_RUAS_JALAN, route.GUID)
                  }
                >
                  {route.NAMA_RUAS_JALAN}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/3">
            <button
              type="submit"
              className="w-10 h-8 bg-yellow-300 rounded-full items-center p-1 hover:bg-yellow-400 ml-4"
            >
              <IoMdSearch className="text-white w-full h-full" />
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Daftar Rute</h1>
        <button
          className="bg-yellow-300 px-2 h-fit rounded-md text-white text-lg font-semibold hover:bg-yellow-500"
          onClick={openAdd}
          // onClick={() => {
          //   console.table(dataRute);
          //   console.table(ruteDetail);
          // }}
        >
          Tambah Rute +
        </button>
      </div>
      <div
        ref={divRef}
        className="bg-white w-full h-screen pb-56 overflow-y-scroll scrollbar-thin"
      >
        {/* Header */}
        <div className="flex text-center py-2">
          <div className="w-1/12">No. Ruas</div>
          <div className="w-4/12">Nama Ruas Jalan</div>
          <div className="w-3/12">Kecamatan Yang Dilalui</div>
          <div className="w-1/12">Keterangan</div>
          <div className="w-3/12"></div>
        </div>

        {/* Data Rows */}
        {loading ? (
          <div className="text-center py-4">Loading data...</div>
        ) : result ? (
          <div
            key={ruteDetail.id}
            className="flex text-center items-center border border-gray-500 rounded-xl my-1 py-1"
          >
            <div className="w-1/12">{ruteDetail.NO_RUAS}</div>
            <div className="w-4/12">{ruteDetail.NAMA_RUAS_JALAN}</div>
            <div className="w-3/12">{ruteDetail.KECAMATAN_YANG_DILALUI}</div>
            <div
              className={`w-1/12 ${
                ruteDetail.KETERANGAN ? "text-left" : "text-center"
              }`}
            >
              {ruteDetail.KETERANGAN || "-"}
            </div>
            <div className="w-3/12 flex justify-center">
              <button
                className="bg-blue-500 text-white text-xs py-1 px-2 m-1 rounded hover:bg-blue-600 flex items-center"
                onClick={() => openEdit(ruteDetail.GUID)}
              >
                <FaRegEdit className="mr-1" />
                Edit
              </button>
              <button
                className="bg-green-500 text-white text-xs px-2 m-1 rounded hover:bg-green-600 flex items-center"
                onClick={() => openDetail(ruteDetail.GUID)}
              >
                <AiOutlineExclamationCircle className="mr-1" />
                Detail
              </button>
              <button
                className="bg-red-500 text-white text-xs px-2 m-1 rounded hover:bg-red-600 flex items-center"
                onClick={() => openDelete(ruteDetail.GUID)}
              >
                <IoTrashSharp className="mr-1" />
                Hapus
              </button>
            </div>
          </div>
        ) : dataRute.length > 0 ? (
          dataRute.map((route) => (
            <div
              key={route.id}
              className="flex text-center items-center border border-gray-500 rounded-xl my-1 py-1"
            >
              <div className="w-1/12">{route.NO_RUAS}</div>
              <div className="w-4/12">{route.NAMA_RUAS_JALAN}</div>
              <div className="w-3/12">{route.KECAMATAN_YANG_DILALUI}</div>
              <div
                className={`w-1/12 ${
                  route.KETERANGAN ? "text-left" : "text-center"
                }`}
              >
                {route.KETERANGAN || "-"}
              </div>
              <div className="w-3/12 flex justify-center">
                <button
                  className="bg-blue-500 text-white text-xs py-1 px-2 m-1 rounded hover:bg-blue-600 flex items-center"
                  onClick={() => openEdit(route.GUID)}
                >
                  <FaRegEdit className="mr-1" />
                  Edit
                </button>
                <button
                  className="bg-green-500 text-white text-xs px-2 m-1 rounded hover:bg-green-600 flex items-center"
                  onClick={() => openDetail(route.GUID)}
                >
                  <AiOutlineExclamationCircle className="mr-1" />
                  Detail
                </button>
                <button
                  className="bg-red-500 text-white text-xs px-2 m-1 rounded hover:bg-red-600 flex items-center"
                  onClick={() => openDelete(route.GUID)}
                >
                  <IoTrashSharp className="mr-1" />
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 flex flex-col">
            <p>No data available</p>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mt-2"
              onClick={fetchRute}
            >
              Reload Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteTable;
