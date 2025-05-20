import { useEffect, useState } from "react";
import axios from "axios";
import { div } from "framer-motion/client";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploader, setUploader] = useState("");
  const [logs, setLogs] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/getrute")
      .then((response) => response.json())
      .then((json) => setRoutes(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  useEffect(() => {
    // console.log("Rute berhasil dimuat:", routes);
  }, [routes]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setMessage("");
    if (!file || !uploader || !route) {
      setMessage("Lengkapi semua input sebelum upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploader", uploader);
    formData.append("route", route);

    try {
      const cekData = await axios.get("http://localhost:8000/cek", {
        params: {
          rute: route,
          namafile: file.name.toUpperCase()
        }
      });
      
      if (!cekData.data) {
        setMessage("Data tidak ditemukan!");
        return;
      }
      setMessage("Upload diproses...")
      const response = await axios.post(
        "http://localhost:8000/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(`Upload sukses: ${response.data.filename}`);
      console.log("Metadata:", response.data.metadata);
    } catch (error) {
      setMessage("Upload gagal!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center my-auto">
      <div className="w-1/2 justify-center items-center p-4 border rounded-lg shadow-md space-y-3">
        <h2 className="text-lg font-semibold">Upload Video</h2>

        <input
          type="text"
          placeholder="Nama Uploader"
          value={uploader}
          onChange={(e) => setUploader(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <select
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Pilih Rute</option>
          {routes.map((r, idx) => (
            <option key={idx} value={r.rute}>
              {r.rute}
            </option>
          ))}
        </select>

        <input type="file" onChange={handleFileChange} className="w-full" />

        <button
          onClick={handleUpload}
          className="bg-blue-400 text-black px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
        >
          Upload
        </button>

        {message && <p className="mt-2 text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default UploadVideo;
