import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import LeafletMap from "./addMap";

const TambahRute = ({ closeAdd }) => {
  const [formData, setFormData] = useState({
    noRuas: "",
    guid: "",
    namaRuasJalan: "",
    ruas: "",
    kecamatanYangDilalui: "",
    keterangan: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
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
              { field: "noRuas", label: "No. Ruas" },
              { field: "guid", label: "GUID" },
              { field: "namaRuasJalan", label: "Nama Ruas Jalan" },
              { field: "ruas", label: "Ruas" },
              {
                field: "kecamatanYangDilalui",
                label: "Kecamatan yang Dilalui",
              },
              { field: "keterangan", label: "Keterangan" },
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
                <LeafletMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahRute;
