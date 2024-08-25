import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { routes } from "./dataRoute";

const MapsKonten = ({ isHidden, ismapsOpen, ambilInput, test }) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleRouteChange = (route) => {
    setSelected(route);
    setOpen(false);
    setInputValue("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ambilInput({ selected, selectedDate});
  };

  return (
    <div className={`${ismapsOpen? "hidden":""}`}>
      <div
        id="konten"
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
                } transition-all duration-300 border-2 rounded-lg border-gray-700`}
              >
                <div className="flex items-center px-2 sticky top-0 bg-white">
                  <AiOutlineSearch size={18} className="text-gray-700" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) =>
                      setInputValue(e.target.value.toLowerCase())
                    }
                    placeholder="Enter route name"
                    className="placeholder:text-gray-700 p-2 outline-none focus:border-black focus:ring-black"
                  />
                </div>
                {routes
                  .filter((route) =>
                    route.name.toLowerCase().startsWith(inputValue)
                  )
                  .map((route) => (
                    <li
                      key={route.name}
                      className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${
                        route.name.toLowerCase() === selected.toLowerCase() &&
                        "bg-sky-600 text-white"
                      } ${
                        route.name.toLowerCase().startsWith(inputValue)
                          ? "block"
                          : "hidden"
                      }`}
                      onClick={() => handleRouteChange(route.name)}
                    >
                      {route.name}
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
            onClick={handleSubmit}
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
