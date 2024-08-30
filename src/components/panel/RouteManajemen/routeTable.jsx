import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";


const RouteTable = ({ openAdd, openDetail, openDelete, openEdit, dataRute }) => {
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
        <h1 className="text-2xl font-bold">Daftar Rute</h1>
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
            <th className="py-1 border">Nama Ruas Jalan</th>
            <th className="py-1 border">Kecamatan Yang Dilalui</th>
            <th className="py-1 border">Keterangan</th>
            <th className="py-1"></th>
          </tr>
        </thead>
        <tbody>
          {dataRute.length > 0 ? (
            dataRute.map((route, index) => (
              <tr key={route.NO_RUAS} className="text-center">
                <td className="py-2 border-r">{index + 1}</td>
                <td className="py-2 border-r">{route.NAMA_RUAS_JALAN}</td>
                <td className="py-2 border-r">{route.KECAMATAN_YANG_DILALUI}</td>
                <td className="p-2 border-r text-left">{route.KETERANGAN || "-"}</td>
                <td className="py-2 flex">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 m-1 rounded hover:bg-blue-600 flex items-center"
                    onClick={() => openEdit(route.GUID)}
                  >
                    <FaRegEdit className="mr-1" />
                    Edit
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 m-1 rounded hover:bg-green-600 flex items-center"
                    onClick={() => openDetail(route.GUID)} // Mengirim detail rute ke parent
                  >
                    <AiOutlineExclamationCircle className="mr-1" />
                    Detail
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 m-1 rounded hover:bg-red-600 flex items-center"
                    onClick={() => openDelete(route.GUID)}
                  >
                    <IoTrashSharp className="mr-1" />
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>  
  );
};

export default RouteTable;
