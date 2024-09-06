import { useEffect } from "react";

const DetailReport = (data, closeDetailReport) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-2/5 bg-gray-200 z-50 overflow-y-scroll scrollbar-thin">
      <div className="w-full h-56 mb-4 relative">
        <div className="w-6 h-auto bg-red-700 absolute top-0 right-0 text-center text-lg cursor-pointer select-none" onClick={closeDetailReport}>
          X
        </div>
        <div className="w-full h-full bg-white m-auto text-center">{data.data.namafile}</div>
        {/* <img src="" alt="" /> */}
      </div>
      <div className="w-full h-auto bg-white my-4 flex flex-col p-3">
        <p className="text-xl font-bold">Detail</p>
        <div className="w-full flex my-2">
          <div className="flex flex-col w-1/2">
            <p className="text-gray-500 text-md">Surveyor</p>
            <p className="font-semibold text-lg">{data.data.surveyor}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <p className="text-gray-500 text-md">Uploader</p>
            <p className="font-semibold text-lg">{data.data.uploader}</p>
          </div>
        </div>
        <div className="w-full flex my-2">
          <div className="flex flex-col w-1/2">
            <p className="text-gray-500 text-md">Status</p>
            <p className="font-semibold text-lg">{data.data.status_ai}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <p className="text-gray-500 text-md ">Kondisi Jalan</p>
            <p className="font-semibold text-lg">{data.data.status_jalan}</p>
          </div>
        </div>
        <div className="w-full flex my-2">
          <div className="flex flex-col w-1/2">
            <p className="text-gray-500 text-md">Station</p>
            <p className=" font-semibold text-lg">{data.data.station}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <p className="text-gray-500 text-md ">Kilometer</p>
            <p className="font-semibold text-lg">{data.data.kilometer}</p>
          </div>
        </div>
        <div className="w-full flex my-2">
          <div className="flex flex-col w-1/2">
            <p className="text-gray-500 text-md ">tanggal survey</p>
            <p className="font-semibold text-lg">{data.data.tanggal_survey}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <p className="text-gray-500 text-md ">tanggal Upload</p>
            <p className="font-semibold text-lg">{data.data.tanggal_upload}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-auto bg-white my-4 p-2 flex flex-col">
        <div className="flex justify-center">
          <p className="text-center text-gray-500 text-lg">Rute</p>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xl font-semibold">
          {data.data.rute}
          </p>
        </div>
      </div>
      <div className="w-full h-auto bg-white mt-4 flex-col p-2">
        <p className="text-lg text-gray-500">Tahapan</p>
        <div className="w-full h-auto p-2 flex relative">
          <div className="h-auto absolute top-6 left-6 -bottom-6 border-2 border-gray-400 rounded-sm opacity-90 z-0"></div>
          <div className="w-9 h-8 bg-blue-500 mt-2 mr-2 rounded-full text-white text-center flex flex-col justify-center z-10">
            1
          </div>
          <div className="w-full h-auto flex flex-col ml-2">
            <p className="font-semibold">Survey</p>
            <div className="text-gray-500">
              Survey telah dilakukan oleh
              <span className="font-semibold text-black"> {data.data.surveyor} </span>
              pada rute
              <span className="font-semibold text-black"> {data.data.rute} </span>
            </div>
          </div>
        </div>
        <div className="w-full h-auto p-2 flex relative">
          <div className="h-auto absolute top-6 left-6 -bottom-6 border-2 border-gray-400 rounded-sm opacity-90 z-0"></div>
          <div className="w-9 h-8 bg-blue-500 mt-2 mr-2 rounded-full text-white text-center flex flex-col justify-center z-10">
            2
          </div>
          <div className="w-full h-auto flex flex-col ml-2">
            <p className="font-semibold">Upload</p>
            <div className="text-gray-500">
              <span className="font-semibold text-black">
              {data.data.tanggal_upload}
              </span>
              <p>Upload Survey diupload oleh</p>
              <span className="font-semibold text-black"> {data.data.uploader} </span>
            </div>
          </div>
        </div>
        <div className="w-full h-auto p-2 flex relative">
          <div className="h-auto absolute top-6 left-6 -bottom-6 border-2 border-gray-400 rounded-sm opacity-90 z-0"></div>
          <div className="w-9 h-8 bg-blue-500 mt-2 mr-2 rounded-full text-white text-center flex flex-col justify-center z-10">
            3
          </div>
          <div className="w-full h-auto flex flex-col ml-2">
            <p className="font-semibold">Form Survey</p>
            <div className="text-gray-500">Form Survey Sudah diisi</div>
          </div>
        </div>
        <div className="w-full h-auto p-2 flex relative">
          {/* <div className="h-auto absolute top-6 left-6 -bottom-6 border-2 border-gray-400 rounded-sm opacity-90 z-0"></div> */}
          <div className="w-9 h-8 bg-blue-500 mt-2 mr-2 rounded-full text-white text-center flex flex-col justify-center z-10">
            4
          </div>
          <div className="w-full h-auto flex flex-col ml-2">
            <p className="font-semibold">Selesai</p>
            <div className="text-gray-500">
              Jalan Dalam Kondisi
              <span className="font-semibold text-black"> {data.data.status_jalan} </span>, klik tombol
              detail untuk melihat detail survey
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReport;