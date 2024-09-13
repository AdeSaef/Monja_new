import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Fuse from "fuse.js";
import { getRuteName } from "../../../services/ruteService";

const MapsKonten = ({ isHidden, ismapsOpen, ambilInput, test }) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRute, setGuidRute] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [ruteName, setRuteName] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  // const [inputData, setInputData] = useState({ rute: "", date: "" });

  const handleRouteChange = (route, guid) => {
    setSelected(route);
    setOpen(false);
    setInputValue("");
    setGuidRute(guid);
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
      initializeFuse(ruteData);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  const initializeFuse = (data) => {
    const fuse = new Fuse(data, {
      keys: ['NAMA_RUAS_JALAN'],
      threshold: 0.4,
    });
    setFilteredRoutes(fuse.search(inputValue).map(result => result.item));
  };

  useEffect(() => {
    fetchRute();
  }, []);

  useEffect(() => {
    if (inputValue === "") {
      setFilteredRoutes(ruteName);
    } else {
      initializeFuse(ruteName);
    }
  }, [inputValue, ruteName]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={`${ismapsOpen ? "hidden" : ""}`}>
      <div
        className={`bg-white rounded-b-lg h-auto transition-all p-2 duration-500 transform ${
          isHidden ? "opacity-0 h-0 pointer-events-none" : "opacity-100 h-96"
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
                  open ? "max-h-60" : "max-h-0 border-none"
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
                {filteredRoutes
                  .map((route) => (
                    <li
                      key={route.NAMA_RUAS_JALAN}
                      className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${
                        route.NAMA_RUAS_JALAN.toLowerCase() ===
                          selected.toLowerCase() && "bg-sky-600 text-white"
                      }`}
                      onClick={() => handleRouteChange(route.NAMA_RUAS_JALAN, route.GUID)}
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

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-blue-500 text-white text-center text-sm px-4 py-1 rounded-lg hover:bg-blue-300"
          >
            Cek Data
          </button>
          <button
            onClick={() => { setSelectedDate(""); setSelectedRute(""); }} // Reset nilai saat tombol Reset ditekan
            className="w-full mt-2 bg-yellow-500 text-white text-center text-sm px-4 py-1 rounded-lg hover:bg-yellow-300"
          >
            Reset
          </button>
          <button
            onClick={test}
            className="w-full mt-2 bg-green-400 text-white text-center text-sm px-4 py-1 rounded-lg hover:bg-green-300"
          >
            Download Report Rute
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapsKonten;
