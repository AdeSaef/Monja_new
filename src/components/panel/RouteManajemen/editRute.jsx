import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import LeafletMap from "./addMap";
import { SubmitEditRute } from "../../../services/ruteService";
import DetailRute from "./detailRute";

const EditRute = ({ routeDetail, closeEdit }) => {
  // Jangan tampilkan apa pun jika routeDetail tidak ada
  if (!routeDetail) return null;

  // State untuk formData, diisi dengan data dari routeDetail
  const [formData, setFormData] = useState({
    NO_RUAS: "",
    RUAS: [],
    NAMA_RUAS_JALAN: "",
    KECAMATAN_YANG_DILALUI: "",
    KETERANGAN: [],
  });

  // Gunakan useEffect untuk mengisi formData saat routeDetail berubah
  useEffect(() => {
    if (routeDetail) {
      // console.table(routeDetail);
      setFormData({
        NO_RUAS: routeDetail.NO_RUAS || "",
        RUAS: routeDetail.RUAS || [], // Pastikan RUAS diisi dengan array kosong jika tidak ada data
        NAMA_RUAS_JALAN: routeDetail.NAMA_RUAS_JALAN || "",
        KECAMATAN_YANG_DILALUI: routeDetail.KECAMATAN_YANG_DILALUI || "",
        KETERANGAN: [routeDetail.KETERANGAN] || [],
      });
    }
  }, [routeDetail]);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "KETERANGAN" ? [value] : value, // Keterangan tetap array
    }));
  };
   

  const editRute = async (formData, id) => {
    try {
      const response = await SubmitEditRute(formData, id);
      if (response.success) {
        alert("Rute berhasil diedit");
        closeEdit();
        
      }
    } catch (error) {
      console.error("Gagal mengedit rute:", error);
    }
  };
  const handleAddPosition = (newPosition) => {
    const newRUAS = {
      lat: newPosition[0], // Ambil latitude dari indeks pertama
      long: newPosition[1], // Ambil longitude dari indeks kedua
    };

    // Perbarui formData dengan posisi baru
    setFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        RUAS: [...(prevData.RUAS || []), newRUAS], // Tambahkan posisi baru ke RUAS
      };
      // console.log("Form Data Setelah Update:", updatedFormData);
      // Panggil fungsi editRute dengan form data yang diperbarui

      return updatedFormData; // Return data baru untuk diperbarui di state
    });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Transformasi RUAS sebelum submit
    const transformedData = {
      ...formData,
      RUAS: formData.RUAS.map(({ lat, long }) => [lat, long]), // Konversi ke array
    };
  
    console.log("Data yang dikirim:", routeDetail.id, transformedData);
  
    editRute(transformedData, routeDetail.id);
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70 z-50">
      <div
        className="w-3/4 h-3/4 border-8 border-stone-600 rounded-3xl bg-white p-12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-xl">Edit Rute</p>
          <button
            className="absolute top-4 right-4 bg-gray-700 text-white font-bold text-3xl rounded-md cursor-pointer"
            onClick={closeEdit}
          >
            <RxCross2 />
          </button>
        </div>
        <div className="flex w-full h-full">
          <form className="mt-4 w-full mr-2" onSubmit={handleSubmit}>
            {[
              { field: "NO_RUAS", label: "No. RUAS", value: formData.NO_RUAS },
              { field: "GUID", label: "GUID", value: routeDetail.GUID },
              {
                field: "NAMA_RUAS_JALAN",
                label: "Nama RUAS Jalan",
                value: formData.NAMA_RUAS_JALAN,
              },
              {
                field: "KECAMATAN_YANG_DILALUI",
                label: "Kecamatan yang Dilalui",
                value: formData.KECAMATAN_YANG_DILALUI,
              },
              {
                field: "KETERANGAN",
                label: "KETERANGAN",
                value: formData.KETERANGAN,
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
                  disabled={field === "GUID"}
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
              coord={formData.RUAS}
              editable={true}
              addMode={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRute;
