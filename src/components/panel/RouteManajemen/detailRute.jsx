import { RxCross2 } from "react-icons/rx";

const DetailRute = ({ routeDetail, closeDetail }) => {
  if (!routeDetail) return null; // Jangan tampilkan apa pun jika routeDetail tidak ada

  const {
    noRuas,
    guid,
    namaRuasJalan,
    ruas,
    kecamatanYangDilalui,
    keterangan,
  } = routeDetail;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
      onClick={closeDetail}
    >
      <div
        className="bg-white p-5 rounded shadow-lg w-2/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detail Rute</h2>
          <button onClick={closeDetail}>
            <RxCross2 />
          </button>
        </div>
        <div className="overflow-auto max-h-96">
          <p>No Ruas: {noRuas}</p>
          <p>GUID: {guid}</p>
          <p>Nama Ruas Jalan: {namaRuasJalan}</p>
          <p>Ruas: {ruas}</p>
          <p>Kecamatan Yang Dilalui: {kecamatanYangDilalui.join(", ")}</p>
          <p>Keterangan: {keterangan}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailRute;
