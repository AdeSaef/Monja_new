import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const EditRute = ({ routeDetail, closeEdit }) => {
  if (!routeDetail) return null; // Jangan tampilkan apa pun jika routeDetail tidak ada

  // Lakukan destrukturisasi langsung dari routeDetail dan set initial state
  const [formData, setFormData] = useState({
    noRuas: routeDetail.NO_RUAS,
    guid: routeDetail.GUID,
    namaRuasJalan: routeDetail.NAMA_RUAS_JALAN,
    kecamatanYangDilalui: routeDetail.KECAMATAN_YANG_DILALUI,
    keterangan: routeDetail.KETERANGAN,
    ruas: "ruas(jarak) tidak ada", // Contoh statis
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika untuk submit data, misalnya kirim ke API
    console.log("Data yang dikirim:", formData);
    // Setelah submit, bisa tambahkan logika untuk close form
    closeEdit();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70 z-50"
      onClick={closeEdit}
    >
      <div
        className="w-1/2 border-8 border-stone-600 rounded-3xl bg-white p-12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-xl">Edit Rute</p>
          <button
            className="absolute top-4 right-4 bg-gray-700 text-white font-bold text-3xl rounded-md"
            onClick={closeEdit}
          >
            <RxCross2 />
          </button>
        </div>
        <div className="flex w-full h-full">
          <form className="mt-4 w-full mr-2" onSubmit={handleSubmit}>
            {[
              { field: "noRuas", label: "No. Ruas", value: formData.noRuas },
              { field: "guid", label: "GUID", value: formData.guid },
              { field: "namaRuasJalan", label: "Nama Ruas Jalan", value: formData.namaRuasJalan },
              { field: "ruas", label: "Ruas", value: formData.ruas },
              {
                field: "kecamatanYangDilalui",
                label: "Kecamatan yang Dilalui",
                value: formData.kecamatanYangDilalui,
              },
              { field: "keterangan", label: "Keterangan", value: formData.keterangan },
            ].map(({ field, label, value }) => (
              <div className="flex flex-col mb-2 pr-2" key={field}>
                <label className="mx-1 text-xs">{label}</label>
                <input
                  type="text"
                  className="rounded-md border w-full p-1 bg-white" // Ubah warna background ke putih untuk menandakan bisa diedit
                  name={field}
                  value={value}
                  onChange={handleChange} // Tambahkan onChange untuk membuat input editable
                />
              </div>
            ))}
            <button
              type="submit"
              className="mt-4 px-4 bg-yellow-300 hover:bg-yellow-500 text-white rounded-sm"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRute;
