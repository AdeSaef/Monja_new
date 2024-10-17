import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import LeafletMap from "./addMap";

const EditRute = ({ routeDetail, closeEdit }) => {
  // Jangan tampilkan apa pun jika routeDetail tidak ada
  if (!routeDetail) return null;

  // State untuk formData, diisi dengan data dari routeDetail
  const [formData, setFormData] = useState({
    no_ruas: "",
    guid: "",
    ruas: [],
    nama_ruas_jalan: "",
    kecamatan_yang_dilalui: "",
    keterangan: "",
  });

  // Gunakan useEffect untuk mengisi formData saat routeDetail berubah
  useEffect(() => {
    if (routeDetail) {
      setFormData({
        no_ruas: routeDetail.NO_RUAS || "",
        guid: routeDetail.GUID || "",
        ruas: routeDetail.RUAS || [], // Pastikan ruas diisi dengan array kosong jika tidak ada data
        nama_ruas_jalan: routeDetail.NAMA_RUAS_JALAN || "",
        kecamatan_yang_dilalui: routeDetail.KECAMATAN_YANG_DILALUI || "",
        keterangan: routeDetail.KETERANGAN || "",
      });
    }
  }, [routeDetail]);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi untuk menambahkan posisi ke dalam ruas (digunakan oleh LeafletMap)
  const handleAddPosition = (newPosition) => {
    setFormData((prevData) => ({
      ...prevData,
      ruas: [...prevData.ruas, newPosition],
    }));
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data yang dikirim:", formData);
    // Logika untuk mengirim data bisa ditambahkan di sini
    // closeEdit(); // Jika ingin menutup form setelah submit
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70 z-50"
      onClick={closeEdit}
    >
      <div
        className="w-3/4 h-3/4 border-8 border-stone-600 rounded-3xl bg-white p-12 relative"
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
              { field: "no_ruas", label: "No. Ruas", value: formData.no_ruas },
              { field: "guid", label: "GUID", value: formData.guid },
              {
                field: "nama_ruas_jalan",
                label: "Nama Ruas Jalan",
                value: formData.nama_ruas_jalan,
              },
              {
                field: "kecamatan_yang_dilalui",
                label: "Kecamatan yang Dilalui",
                value: formData.kecamatan_yang_dilalui,
              },
              {
                field: "keterangan",
                label: "Keterangan",
                value: formData.keterangan,
              },
            ].map(({ field, label, value }) => (
              <div className="flex flex-col mb-2 pr-2" key={field}>
                <label className="mx-1 text-xs">{label}</label>
                <input
                  type="text"
                  className="rounded-md border w-full p-1 bg-white"
                  name={field}
                  value={value}
                  onChange={handleChange}
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
          <div className="w-full h-full overflow-clip ml-4">
            <LeafletMap
              onAddPosition={handleAddPosition}
              coord={formData.ruas}
              editable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRute;
