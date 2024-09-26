import { useState } from "react";
import unchecked from "../../../assets/Unchecked.png";
import checked from "../../../assets/Checked.png";
import { useEffect } from "react";

export const Retakan = ({ data, onUpdate }) => {
  const [Jenis, setJenis] = useState(1);
  const [Lebar, setLebar] = useState(1);
  const [Luas, setLuas] = useState(1);
  const moreData = data.FORM_SURVEY;
  const [formData, setFormData] = useState({
    TYPE: moreData.CRACKS.TYPE,
    LARGE: moreData.CRACKS.LARGE,
    WIDE: moreData.CRACKS.WIDE,
  });

  useEffect(() => {
    const jenisMap = {
      1: "Tidak ada",
      2: "Tidak berhubungan",
      3: "Saling berhubungan (Berbidang luas)",
      4: "Saling berhubungan (Berbidang sempit)",
    };
    const lebarMap = {
      1: "Tidak ada",
      2: "Halus < 1 mm",
      3: "Sedang 1 - 5 mm",
      4: "Lebar > 5 mm",
    };
    const luasMap = {
      1: "Tidak ada",
      2: "< 10% luas",
      3: "10-30% luas",
      4: "> 30% luas",
    };

    setFormData({
      TYPE: jenisMap[Jenis] || "Tidak ada",
      LARGE: lebarMap[Lebar] || "Tidak ada",
      WIDE: luasMap[Luas] || "Tidak ada",
    });
  }, [Jenis, Lebar, Luas]);

  useEffect(() => {
    const jenisMap = {
      "Tidak ada": 1,
      "Tidak berhubungan": 2,
      "Saling berhubungan (Berbidang luas)": 3,
      "Saling berhubungan (Berbidang sempit)": 4,
    };
    setJenis(jenisMap[moreData.CRACKS.TYPE] || 1);

    const lebarMap = {
      "Tidak ada": 1,
      "Halus < 1 mm": 2,
      "Sedang 1 - 5 mm": 3,
      "Lebar > 5 mm": 4,
    };
    setLebar(lebarMap[moreData.CRACKS.LARGE] || 1);

    const luasMap = {
      "Tidak ada": 1,
      "< 10% luas": 2,
      "10-30% luas": 3,
      "> 30% luas": 4,
    };
    setLuas(luasMap[moreData.CRACKS.WIDE] || 1);
  }, [moreData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      TYPE: Jenis,
      LARGE: Lebar,
      WIDE: Luas,
    };
    onUpdate(updatedData);
  };

  const handleJenisClick = (value) => {
    setJenis(value);
    const jenisMap = {
      1: "Tidak ada",
      2: "Tidak berhubungan",
      3: "Saling berhubungan (Berbidang luas)",
      4: "Saling berhubungan (Berbidang sempit)",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      TYPE: jenisMap[value],
    }));
  };

  const handleLebarClick = (value) => {
    setLebar(value);
    const lebarMap = {
      1: "Tidak ada",
      2: "Halus < 1 mm",
      3: "Sedang 1 - 5 mm",
      4: "Lebar > 5 mm",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      LARGE: lebarMap[value],
    }));
  };

  const handleLuasClick = (value) => {
    setLuas(value);
    const luasMap = {
      1: "Tidak ada",
      2: "< 10% luas",
      3: "10-30% luas",
      4: "> 30% luas",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      WIDE: luasMap[value],
    }));
  };

  return (
    <>
      <div className="text-center font-bold">Retak-retak</div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-bold">Label</div>
        <div className="w-full h-full font-bold pl-2">Kondisi</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Jenis</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img
              src={Jenis === 1 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleJenisClick(1)}
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img
              src={Jenis === 2 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleJenisClick(2)}
            />
            <div>Tidak Berhubungan</div>
          </div>
          <div className="flex items-center">
            <img
              src={Jenis === 3 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleJenisClick(3)}
            />
            <div>Saling Berhubungan (Berbidang Luas)</div>
          </div>
          <div className="flex items-center">
            <img
              src={Jenis === 4 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleJenisClick(4)}
            />
            <div>Saling Berhubungan (Berbidang Sempit)</div>
          </div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Lebar</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img
              src={Lebar === 1 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleLebarClick(1)}
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img
              src={Lebar === 2 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleLebarClick(2)}
            />
            <div>Halus &lt; 1mm</div>
          </div>
          <div className="flex items-center">
            <img
              src={Lebar === 3 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleLebarClick(3)}
            />
            <div>Sedang 1-5mm</div>
          </div>
          <div className="flex items-center">
            <img
              src={Lebar === 4 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleLebarClick(4)}
            />
            <div>lebar &gt; 5mm</div>
          </div>
        </div>
      </div>
      <div className="border-y-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">% Luas</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img
              src={Luas === 1 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleLuasClick(1)}
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img
              src={Luas === 2 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleLuasClick(2)}
            />
            <div>&lt;10% luas</div>
          </div>
          <div className="flex items-center">
            <img
              src={Luas === 3 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleLuasClick(3)}
            />
            <div>10 - 30% luas</div>
          </div>
          <div className="flex items-center">
            <img
              src={Luas === 4 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => handleLuasClick(4)}
            />
            <div>&gt;30% luas</div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex justify-center p-2">
        <button
          className="bg-green-500 text-white font-semibold py-2 px-8 rounded-md hover:bg-green-600"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </>
  );
};
