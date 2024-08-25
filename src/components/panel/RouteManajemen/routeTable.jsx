import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import routesData from "./routeData.json";

const RouteTable = ({ openAdd, openDetail }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Input value:", inputValue);
  };

  return (
    <div className="container mx-auto">
      <div>
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            type="text"
            className="border h-10 rounded-full w-full mr-4 px-4"
            placeholder="Cari Rute..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="w-1/3">
            <button
              type="submit"
              className="w-12 h-10 bg-yellow-300 rounded-full items-center p-1 hover:bg-yellow-400"
            >
              <IoMdSearch className="text-white w-full h-full " />
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ">Daftar Rute</h1>
        <button
          className="bg-yellow-300 px-2 h-fit rounded-md text-white text-lg font-semibold hover:bg-yellow-500"
          onClick={openAdd}
        >
          Tambah Rute +
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-1 border">No. Ruas</th>
            <th className="py-1 border">GUID</th>
            <th className="py-1 border">Nama Ruas Jalan</th>
            <th className="py-1 border">Ruas</th>
            <th className="py-1 border">Kecamatan Yang Dilalui</th>
            <th className="py-1 border">Keterangan</th>
            <th className="py-1"></th>
          </tr>
        </thead>
        <tbody>
          {routesData.map((route) => (
            <tr key={route.NoRuas} className="text-center ">
              <td className="py-2 border-r">{route.NoRuas}</td>
              <td className="py-2 border-r">{route.GUID}</td>
              <td className="py-2 border-r">{route.NamaRuasJalan}</td>
              <td className="py-2 border-r">{route.Ruas}</td>
              <td className="py-2 border-r">
                {route.KecamatanYangDilalui.join(", ")}
              </td>
              <td className="p-2 border-r text-left">{route.Keterangan}</td>
              <td className="py-2 flex">
                <button
                  className="bg-blue-500 text-white px-2 py-1 m-1 rounded hover:bg-blue-600 flex items-center"
                  onClick={() => alert(`Edit route dengan ID: ${route.NoRuas}`)}
                >
                  <FaRegEdit className="mr-1" />
                  Edit
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 m-1 rounded hover:bg-green-600 flex items-center"
                  onClick={() => openDetail(route)} // Mengirim detail rute ke parent
                >
                  <AiOutlineExclamationCircle className="mr-1" />
                  Detail
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 m-1 rounded hover:bg-red-600 flex items-center"
                  onClick={() => alert(`Hapus route dengan ID: ${route.NoRuas}`)}
                >
                  <IoTrashSharp className="mr-1" />
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteTable;
