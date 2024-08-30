import { RxCross2 } from "react-icons/rx";

const DetailRute = ({ routeDetail, closeDetail }) => {
  if (!routeDetail) return null; // Jangan tampilkan apa pun jika routeDetail tidak ada

  // Lakukan destrukturisasi langsung dari routeDetail
  const {
    NO_RUAS: noRuas,
    GUID: guid,
    NAMA_RUAS_JALAN: namaRuasJalan,
    KECAMATAN_YANG_DILALUI: kecamatanYangDilalui,
    KETERANGAN: keterangan,
  } = routeDetail;

  // Ruas diatur sebagai nilai string statis untuk contoh ini
  const ruas = "ruas(jarak) tidak ada";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70 z-50"
      onClick={closeDetail}
    >
      <div
        className="w-1/2 border-8 border-stone-600 rounded-3xl bg-white p-12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-xl">Detail Rute</p>
          <button
            className="absolute top-4 right-4 bg-gray-700 text-white font-bold text-3xl rounded-md"
            onClick={closeDetail}
          >
            <RxCross2 />
          </button>
        </div>
        <div className="flex w-full h-full">
          <form className="mt-4 w-full mr-2">
            {[
              { field: "noRuas", label: "No. Ruas", value: noRuas },
              { field: "guid", label: "GUID", value: guid },
              { field: "namaRuasJalan", label: "Nama Ruas Jalan", value: namaRuasJalan },
              { field: "ruas", label: "Ruas", value: ruas },
              {
                field: "kecamatanYangDilalui",
                label: "Kecamatan yang Dilalui",
                value: kecamatanYangDilalui,
              },
              { field: "keterangan", label: "Keterangan", value: keterangan },
            ].map(({ field, label, value }) => (
              <div className="flex flex-col mb-2 pr-2" key={field}>
                <label className="mx-1 text-xs">{label}</label>
                <input
                  type="text"
                  className="rounded-md border w-full p-1 bg-gray-200" // Warna background untuk menekankan input tidak bisa diedit
                  name={field}
                  value={value}
                  disabled // Menjadikan input tidak bisa diubah
                />
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailRute;
