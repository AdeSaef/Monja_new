import { React, useState, useEffect } from "react";
import { getImage } from "../../services/reportServices";
import { Detail } from "./Detail/Detail";
import { Kekerasan } from "./Detail/Kekerasan";
import { Retakan } from "./Detail/Retakan";
import { KerusakanLain } from "./Detail/KerusakanLain";
import { BahuSaluran } from "./Detail/BahuSaluran";
import { KondisiJalan } from "./Detail/KondisiJalan";

const MoreDetailReport = ({ data, closeMoreDetailReport }) => {
  const [imageURL, setImageSrc] = useState(""); // Menggunakan imageURL sebagai variabel state
  const [onDetail, setOnDetail] = useState(true);
  const [onKekerasan, setOnKekerasan] = useState(false);
  const [onRetakan, setOnRetakan] = useState(false);
  const [onOther, setOnOther] = useState(false);
  const [onBahu, setOnBahu] = useState(false);
  const [onKondisi, setOnKondisi] = useState(false);

  const openDetail =() =>{
    setOnDetail(true);
    setOnKekerasan(false);
    setOnRetakan(false);
    setOnOther(false);
    setOnBahu(false);
    setOnKondisi(false);
  }
  const openKekerasan =() =>{
    setOnDetail(false);
    setOnKekerasan(true);
    setOnRetakan(false);
    setOnOther(false);
    setOnBahu(false);
    setOnKondisi(false);
  }
  const openRetakan =() =>{
    setOnDetail(false);
    setOnKekerasan(false);
    setOnRetakan(true);
    setOnOther(false);
    setOnBahu(false);
    setOnKondisi(false);
  }
  const openOther =() =>{
    setOnDetail(false);
    setOnKekerasan(false);
    setOnRetakan(false);
    setOnOther(true);
    setOnBahu(false);
    setOnKondisi(false);
  }
  const openBahu =() =>{
    setOnDetail(false);
    setOnKekerasan(false);
    setOnRetakan(false);
    setOnOther(false);
    setOnBahu(true);
    setOnKondisi(false);
  }
  const openKondisi =() =>{
    setOnDetail(false);
    setOnKekerasan(false);
    setOnRetakan(false);
    setOnOther(false);
    setOnBahu(false);
    setOnKondisi(true);
  }
  useEffect(() => {
    // Fungsi async di dalam useEffect untuk fetch gambar
    const fetchImage = async () => {
      // console.log("nama file : ",data.namafile);
      const imgSrc = await getImage(data.namafile);
      // const imgSrc = await getImage('GX010359.MP4_0-02-06.00.jpg');
      setImageSrc(imgSrc);
      // console.log(imageURL); // Set gambar URL ke state
    };

    fetchImage(); // Panggil fungsi async
  }, [data.namafile]); // Tambahkan dependency agar hanya dipanggil saat fileName berubah
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex z-50 bg-white overflow-x-hidden">
      {/* Bagian kiri: Gambar dan Detail */}
      <div className="flex-1 flex flex-col z-50">
        <div className="flex m-3">
          <div
            className="bg-gray-700 w-8 h-8 rounded-md text-white select-none cursor-pointer text-center flex flex-col justify-center"
            onClick={closeMoreDetailReport}
          >
            X
          </div>
          {/* Gambar */}
          <div className="w-full flex items-center justify-center mr-40 mt-8 min-h-72">
            {imageURL ? ( // Menampilkan gambar jika imageURL tersedia
            <img src={imageURL} alt={data.fileName} className="w-full h-auto"/>
          ) : (
            <p>Loading image...</p> // Placeholder saat gambar sedang dimuat
          )}
          </div>
        </div>
        {/* Detail */}
        {/* <div className="bg-green-300 flex-1 flex items-center justify-center">
          <h2>Detail</h2>
        </div> */}
        <div className={`border-2 ${onBahu?"":"p-4"} ${onKondisi? "":"items-center justify-center flex-1 "}flex flex-col select-none`}>
            {onDetail && <Detail data={data}/>}
            {onKekerasan && <Kekerasan data={data}/>}
            {onRetakan && <Retakan data={data}/>}
            {onOther && <KerusakanLain data={data}/>}
            {onBahu && <BahuSaluran data={data}/>}
            {onKondisi && <KondisiJalan data={data}/>}
        </div>
      </div>

      {/* Menu Utama di sebelah kanan */}
      <div className="w-1/3 flex justify-end">
        <div className="w-full h-auto">
          <div className="flex flex-col border-r-2 border-gray-300 mr-4 mt-2">
            <div className="text-end flex flex-wrap justify-end mb-4">
              <div className={`group ${onDetail ? "bg-gray-300 text-white" : "bg-gradient-to-r from-white to-gray-300"} transition duration-300`} onClick={openDetail}>
                <div className="group-hover:bg-gray-300 group-hover:text-white pl-4 pr-2 text-2xl font-semibold select-none cursor-pointer">
                  Detail
                </div>
              </div>
            </div>
            <div className="text-end flex flex-wrap justify-end my-4">
              <div className={`group ${onKekerasan ? "bg-gray-300 text-white" : "bg-gradient-to-r from-white to-gray-300"} transition duration-300`} onClick={openKekerasan}>
                <div className="group-hover:bg-gray-300 group-hover:text-white pl-4 pr-2 text-2xl font-semibold select-none cursor-pointer">
                  Kekerasan
                </div>
              </div>
            </div>
            <div className="text-end flex flex-wrap justify-end my-4">
              <div className={`group ${onRetakan ? "bg-gray-300 text-white" : "bg-gradient-to-r from-white to-gray-300"} transition duration-300`} onClick={openRetakan}>
                <div className="group-hover:bg-gray-300 group-hover:text-white pl-4 pr-2 text-2xl font-semibold select-none cursor-pointer">
                  Retak-retak
                </div>
              </div>
            </div>
            <div className="text-end flex flex-wrap justify-end my-4">
              <div className={`group ${onOther ? "bg-gray-300 text-white" : "bg-gradient-to-r from-white to-gray-300"} transition duration-300`} onClick={openOther}>
                <div className="group-hover:bg-gray-300 group-hover:text-white pl-4 pr-2 text-2xl font-semibold select-none cursor-pointer">
                  Kerusakan Lain
                </div>
              </div>
            </div>
            <div className="text-end flex flex-wrap justify-end my-4">
              <div className={`group ${onBahu ? "bg-gray-300 text-white" : "bg-gradient-to-r from-white to-gray-300"} transition duration-300`} onClick={openBahu}>
                <div className="group-hover:bg-gray-300 group-hover:text-white pl-4 pr-2 text-2xl font-semibold select-none cursor-pointer">
                  Bahu Saluran
                </div>
              </div>
            </div>
            <div className="text-end flex flex-wrap justify-end mt-2 mb-4">
              <div className={`group ${onKondisi ? "bg-gray-300 text-white" : "bg-gradient-to-r from-white to-gray-300"} transition duration-300`} onClick={openKondisi}>
                <div className="group-hover:bg-gray-300 group-hover:text-white pl-4 pr-2 text-2xl font-semibold select-none cursor-pointer">
                  Kondisi Jalan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetailReport;
