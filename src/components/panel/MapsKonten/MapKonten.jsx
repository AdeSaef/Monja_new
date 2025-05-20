import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Fuse from "fuse.js";
import { getKoordinatReport, getRuteName } from "../../../services/ruteService";
import { MdDownload } from "react-icons/md";
import { HiArrowLongLeft } from "react-icons/hi2";
import filter from "../../../assets/button/filter.jpeg";
import { urlLokalApi } from "../../../api/axios";

const MapsKonten = ({
  isHidden,
  ismapsOpen,
  ambilInput,
  ambilInputGuid,
  notFound,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [selectedRute, setGuidRute] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [ruteName, setRuteName] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  const handleRouteChange = (route, guid) => {
    setSelected(route);
    setOpen(false);
    setInputValue("");
    setGuidRute(guid);
  };

  const handleRouteSearch = (route, guid) => {
    setSelected(route);
    setSearch(false);
    setInputSearch(route);
    setGuidRute(guid);
    ambilInputGuid(guid);
  };

  const DownloadReport = async () => {
    console.log("clicked!");
    try {
      // Konversi tanggal
      const datetconvert = formatDate(selectedDate);
  
      // Ambil GUID
      const getGuid = await getKoordinatReport(selectedRute, datetconvert);
      console.log(getGuid);
      const guidreport = getGuid[0]?.guid_survey; // Gunakan optional chaining untuk menghindari error jika getGuid tidak valid
  
      if (!guidreport) {
        throw new Error("GUID tidak ditemukan. Periksa data input Anda.");
      }
  
      // Bangun URL untuk laporan
      const reportUrl = `${urlLokalApi}final-report/download/${guidreport}`;
  
      // Buka tab baru dengan URL
      window.open(reportUrl, '_blank', 'noopener,noreferrer');
  
      // Berikan feedback ke user
      alert("Laporan sedang diunduh!");
    } catch (error) {
      console.error("Error saat mengunduh laporan:", error);
      alert("Gagal mengunduh laporan. Silakan coba lagi.");
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const datetconvert = formatDate(selectedDate);
    ambilInput(selectedRute, datetconvert);
  };

  const fetchRute = async () => {
    try {
      const survey = await getRuteName();
      const ruteData = survey.data;
      setRuteName(ruteData);
      setFilteredRoutes(ruteData);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  const initializeFuse = (data, input) => {
    const fuse = new Fuse(data, {
      keys: ["NAMA_RUAS_JALAN"],
      threshold: 0.4,
    });
    setFilteredRoutes(fuse.search(input).map((result) => result.item));
  };

  useEffect(() => {
    fetchRute();
  }, []);

  useEffect(() => {
    if (inputValue === "") {
      setFilteredRoutes(ruteName);
    } else {
      initializeFuse(ruteName, inputValue);
    }
  }, [inputValue, ruteName]);

  useEffect(() => {
    if (inputSearch === "") {
      setFilteredRoutes(ruteName);
    } else {
      initializeFuse(ruteName, inputSearch);
    }
  }, [inputSearch, ruteName]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="z-50 absolute top-0 left-0 w-7/12 overflow-clip">
      <div className="flex flex-col w-screen select-none">
        <input
          type="text"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          className="bg-white w-5/12 h-8 my-2 mx-4 rounded-xl border border-gray-500 px-3 text-gray-500"
          placeholder="Cari..."
          onClick={() => {
            setSearch(!search);
            setIsFilter(false);
          }}
        ></input>
        {search && (
          <div className="bg-white w-5/12 h-auto max-h-40 my-2 mx-4 rounded-xl border border-gray-500 px-3 text-gray-500 overflow-y-scroll">
            {filteredRoutes.map((route) => (
              <div
                key={route.NAMA_RUAS_JALAN}
                className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${
                  route.NAMA_RUAS_JALAN.toLowerCase() ===
                    selected.toLowerCase() && "bg-sky-600 text-white"
                }`}
                onClick={() =>
                  handleRouteSearch(route.NAMA_RUAS_JALAN, route.GUID)
                }
              >
                {route.NAMA_RUAS_JALAN}
              </div>
            ))}
          </div>
        )}
        <div className="flex mx-4">
          <div className="h-10 w-10 mr-2 rounded-md border border-gray-400 overflow-clip">
            <img
              src={filter}
              className="select-none cursor-pointer"
              onClick={() => {
                setIsFilter((prev) => !prev);
                setSearch(false);
              }}
            />
          </div>
          <div
            className={`flex flex-col transition-opacity duration-300 ease-in-out ${
              isFilter ? "opacity-100 w-1/2" : "opacity-0 w-0 h-0 overflow-clip"
            }`}
          >
            <div className="bg-white h-5 w-12 border border-gray-500 rounded-tr-lg overflow-clip">
              <HiArrowLongLeft
                className="transform text-xl w-full cursor-pointer select-none"
                style={{ transform: "scaleX(2.5)" }}
                onClick={() => {
                  setIsFilter((prev) => !prev);
                }}
              />
            </div>
            <div
              className={`rounded-xl rounded-tl-none border border-gray-500 bg-white h-auto w-8/12 transition-all p-2 duration-500 transform z-50 ${
                isHidden
                  ? "opacity-0 h-0 pointer-events-none"
                  : "opacity-100 h-96"
              } select-none`}
            >
              <div className="container mx-auto py-4 px-1">
                <p className="font-semibold">Route</p>
                <div className="mb-0">
                  <div className="w-full font-medium">
                    <div
                      onClick={() => setOpen(!open)}
                      className={`bg-white w-full border shadow rounded-lg py-1 px-3 flex items-center justify-between ${
                        open ? "border-black" : "border-grey-400"
                      }`}
                    >
                      {selected
                        ? selected.length > 25
                          ? selected.substring(0, 25) + "..."
                          : selected
                        : "Select Route"}
                      <BiChevronDown
                        size={20}
                        className={`${open && "rotate-180"}`}
                      />
                    </div>
                    <ul
                      className={`bg-white absolute z-10 mt-1 mx-3 left-0 right-0 overflow-y-auto ${
                        open ? "max-h-40" : "max-h-0 border-none"
                      } transition-all duration-300 border rounded-lg border-gray-700`}
                    >
                      <div className="flex items-center px-2 sticky top-0 bg-white">
                        <AiOutlineSearch size={18} className="text-gray-700" />
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Enter route name"
                          className="placeholder:text-gray-700 p-2 outline-none focus:border-black focus:ring-black"
                        />
                      </div>
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
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="text-sm font-semibold">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="shadow appearance-none border-2 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black focus:shadow-outline"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className={`text-red-600 ${notFound ? "" : "hidden"}`}>
                  Data Tidak Ditemukan.
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full mt-4 bg-black text-white text-center text-sm px-4 py-1 rounded-md"
                >
                  Cek Data
                </button>
                <div className="flex">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-1/2 h-auto mt-2 text-center text-sm px-4 rounded-md border-2 border-black mr-1"
                  >
                    Reset
                  </button>
                  <button className="flex w-1/2 h-auto mt-2 text-center text-xs px-2 justify-center rounded-md border-2 border-black ml-1" onClick={DownloadReport}>
                    <MdDownload
                      className="text-black text-lg"
                    />
                    <span className="whitespace-nowrap">
                      Download Report Rute
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsKonten;
