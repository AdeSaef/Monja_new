import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import LeafletMap from "./addMap";
import { lokalApi, serverApi } from "../../../api/axios";

const TambahRute = ({ closeAdd }) => {
  const [formData, setFormData] = useState({
    NO_RUAS: "",
    NAMA_RUAS_JALAN: "",
    RUAS: [],
    KECAMATAN_YANG_DILALUI: "",
    KETERANGAN: [""], // Mulai dengan satu elemen di array
    COMPANY: "383c0103-76a6-4c12-bd84-499d4f8e2579",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPosition = (newPosition) => {
    setFormData((prevData) => ({
      ...prevData,
      RUAS: [...prevData.RUAS, newPosition],
    }));
  };

  const handleKeteranganChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      KETERANGAN: [value], // Perbarui hanya elemen pertama dalam array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await serverApi.post("/rute/add", formData);

      if (response.data.success) {
        alert(response.data.message);
        // Navigasi ke halaman lain jika diperlukan
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat melakukan pendaftaran");
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70 z-50"
      onClick={closeAdd}
    >
      <div
        className="w-1/2 border-8 border-stone-600 rounded-3xl bg-white p-12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold text-xl">Tambahkan Rute</p>
          <button
            className="absolute top-4 right-4 bg-gray-700 text-white font-bold text-3xl rounded-md"
            onClick={closeAdd}
          >
            <RxCross2 />
          </button>
        </div>
        <div className="flex w-full h-full">
          <form onSubmit={handleSubmit} className="mt-4 w-full mr-2">
            {[
              { field: "NO_RUAS", label: "No. Ruas" },
              { field: "NAMA_RUAS_JALAN", label: "Nama Ruas Jalan" },
              {
                field: "KECAMATAN_YANG_DILALUI",
                label: "Kecamatan yang Dilalui",
              },
            ].map(({ field, label }) => (
              <div className="flex flex-col mb-2 pr-2" key={field}>
                <label className="mx-1 text-xs">{label}</label>
                <input
                  type="text"
                  className="rounded-md border w-full p-1"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
            
            {/* Input untuk keterangan */}
            <div className="flex flex-col mb-2 pr-2">
              <label className="mx-1 text-xs">Keterangan</label>
              <textarea
                className="rounded-md border w-full p-1"
                value={formData.KETERANGAN[0]} // Menampilkan elemen pertama
                onChange={handleKeteranganChange} // Perbarui elemen pertama
              />
            </div>

            <div className="flex my-3">
              <button
                className="bg-yellow-400 text-center text-sm text-white rounded-md px-2"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="w-full h-auto flex justify-center">
            <div className="mx-6 h-full w-full">
              <div className="App">
                <LeafletMap onAddPosition={handleAddPosition} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahRute;
