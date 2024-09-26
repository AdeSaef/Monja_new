import { useState, useEffect } from "react";
import checked from "../../../assets/Checked.png"
import unchecked from "../../../assets/Unchecked.png"

export const KerusakanLain = ({ data, onUpdate }) => {
  const [Jumlah, setJumlah] = useState(1);
  const [Ukuran, setUkuran] = useState(1);
  const [BekasRoda, setBekas] = useState(1);
  const [TepiKiri, setTepiKiri] = useState(1);
  const [TepiKanan, setTepiKanan] = useState(1);
  const moreData = data.FORM_SURVEY;

  const [formData, setFormData] = useState({
    HOLE_NUMBER: moreData.OTHER_DAMAGE.HOLE_NUMBER,
    HOLE_SIZE: moreData.OTHER_DAMAGE.HOLE_SIZE,
    EX_WHEEL: moreData.OTHER_DAMAGE.EX_WHEEL,
    LEFT_DAMAGE_EDGE: moreData.OTHER_DAMAGE.LEFT_DAMAGE_EDGE,
    RIGHT_DAMAGE_EDGE: moreData.OTHER_DAMAGE.RIGHT_DAMAGE_EDGE,
  });

  useEffect(() => {
    const jumlahMap = {
      1: "Tidak ada",
      2: "<10/km",
      3: "10-15/km",
      4: ">50/km",
    };
    const ukuranMap = {
      1: "Tidak ada",
      2: "Kecil-dangkal",
      3: "Kecil-dalam",
      4: "Besar-dangkal",
      5: "Besar-dalam",
    };
    const bekasMap = {
      1: "Tidak ada",
      2: "<1 cm dalam",
      3: "1 - 3 cm dalam",
      4: "> 3 cm dalam",
    };
    const tepiMap = {
      1: "Tidak ada",
      2: "Ringan",
      3: "Berat",
    };

    setFormData({
      HOLE_NUMBER: jumlahMap[Jumlah] || "Tidak ada",
      HOLE_SIZE: ukuranMap[Ukuran] || "Tidak ada",
      EX_WHEEL: bekasMap[BekasRoda] || "Tidak ada",
      LEFT_DAMAGE_EDGE: tepiMap[TepiKiri] || "Tidak ada",
      RIGHT_DAMAGE_EDGE: tepiMap[TepiKanan] || "Tidak ada",
    });
  }, [Jumlah, Ukuran, BekasRoda, TepiKiri, TepiKanan]);

  useEffect(() => {
    const jumlahMap = {
      "Tidak ada": 1,
      "<10/km": 2,
      "10-15/km": 3,
      ">50/km": 4,
    };
    setJumlah(jumlahMap[moreData.OTHER_DAMAGE.HOLE_NUMBER] || 1);

    const ukuranMap = {
      "Tidak ada": 1,
      "Kecil-dangkal": 2,
      "Kecil-dalam": 3,
      "Besar-dangkal": 4,
      "Besar-dalam": 5,
    };
    setUkuran(ukuranMap[moreData.OTHER_DAMAGE.HOLE_SIZE] || 1);

    const bekasMap = {
      "Tidak ada": 1,
      "<1 cm dalam": 2,
      "1 - 3 cm dalam": 3,
      "> 3 cm dalam": 4,
    };
    setBekas(bekasMap[moreData.OTHER_DAMAGE.EX_WHEEL] || 1);

    const tepiMap = {
      "Tidak ada": 1,
      "Ringan": 2,
      "Berat": 3,
    };
    setTepiKiri(tepiMap[moreData.OTHER_DAMAGE.LEFT_DAMAGE_EDGE] || 1);
    setTepiKanan(tepiMap[moreData.OTHER_DAMAGE.RIGHT_DAMAGE_EDGE] || 1);
  }, [moreData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      HOLE_NUMBER: Jumlah,
      HOLE_SIZE: Ukuran,
      EX_WHEEL: BekasRoda,
      LEFT_DAMAGE_EDGE: TepiKiri,
      RIGHT_DAMAGE_EDGE: TepiKanan,
    };
    onUpdate(updatedData);
  };

  const handleJumlahClick = (value) => {
    setJumlah(value);
    const jumlahMap = {
      1: "Tidak ada",
      2: "<10/km",
      3: "10-15/km",
      4: ">50/km",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      HOLE_NUMBER: jumlahMap[value],
    }));
  };

  const handleUkuranClick = (value) => {
    setUkuran(value);
    const ukuranMap = {
      1: "Tidak ada",
      2: "Kecil-dangkal",
      3: "Kecil-dalam",
      4: "Besar-dangkal",
      5: "Besar-dalam",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      HOLE_SIZE: ukuranMap[value],
    }));
  };

  const handleBekasClick = (value) => {
    setBekas(value);
    const bekasMap = {
      1: "Tidak ada",
      2: "<1 cm dalam",
      3: "1 - 3 cm dalam",
      4: "> 3 cm dalam",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      EX_WHEEL: bekasMap[value],
    }));
  };

  const handleTepiKiriClick = (value) => {
    setTepiKiri(value);
    const tepiMap = {
      1: "Tidak ada",
      2: "Ringan",
      3: "Berat",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      LEFT_DAMAGE_EDGE: tepiMap[value],
    }));
  };

  const handleTepiKananClick = (value) => {
    setTepiKanan(value);
    const tepiMap = {
      1: "Tidak ada",
      2: "Ringan",
      3: "Berat",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      RIGHT_DAMAGE_EDGE: tepiMap[value],
    }));
  };

  return (
    <>
      <div className="text-center font-bold">Kerusakan Lain</div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-bold">Label</div>
        <div className="w-full h-full font-bold pl-2">Kondisi</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Jumlah Lubang</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img src={Jumlah === 1 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleJumlahClick(1)} />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={Jumlah === 2 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleJumlahClick(2)} />
            <div>Kurang Dari 10/Km</div>
          </div>
          <div className="flex items-center">
            <img src={Jumlah === 3 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleJumlahClick(3)} />
            <div>10-15/Km</div>
          </div>
          <div className="flex items-center">
            <img src={Jumlah === 4 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleJumlahClick(4)} />
            <div>Lebih dari 50/Km</div>
          </div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Ukuran Lubang</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img src={Ukuran === 1 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleUkuranClick(1)} />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={Ukuran === 2 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleUkuranClick(2)} />
            <div>Kecil - Dangkal</div>
          </div>
          <div className="flex items-center">
            <img src={Ukuran === 3 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleUkuranClick(3)} />
            <div>Kecil - Dalam</div>
          </div>
          <div className="flex items-center">
            <img src={Ukuran === 4 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleUkuranClick(4)} />
            <div>Besar - Dangkal</div>
          </div>
          <div className="flex items-center">
            <img src={Ukuran === 5 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleUkuranClick(5)} />
            <div>Besar - Dalam</div>
          </div>
        </div>
      </div>
      <div className="border-y-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Bekas Roda</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img src={BekasRoda === 1 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleBekasClick(1)} />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={BekasRoda === 2 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleBekasClick(2)} />
            <div>Kurang dari 1cm dalam</div>
          </div>
          <div className="flex items-center">
            <img src={BekasRoda === 3 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleBekasClick(3)} />
            <div>1 - 3 cm dalam</div>
          </div>
          <div className="flex items-center">
            <img src={BekasRoda === 4 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleBekasClick(4)} />
            <div>lebih dari 3 cm</div>
          </div>
        </div>
      </div>
      <div className="text-center font-bold my-2">Kerusakan Tepi</div>
      <div className="border-t-2 w-full h-full flex">
        <div className="w-1/2 h-full text-center">KR</div>
        <div className="w-1/2 h-full text-center">KN</div>
      </div>
      <div className="border-y-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div className="flex items-center">
            <img src={TepiKiri === 1 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleTepiKiriClick(1)} />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={TepiKiri === 2 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleTepiKiriClick(2)} />
            <div>Ringan</div>
          </div>
          <div className="flex items-center">
            <img src={TepiKiri === 3 ? checked : unchecked} className="w-4 h-4 mr-1 cursor-pointer" onClick={() => handleTepiKiriClick(3)} />
            <div>Berat</div>
          </div>
        </div>
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
         <div className="flex items-center">
            <img 
              src={TepiKanan === 1 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleTepiKananClick(1)} 
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img 
              src={TepiKanan === 2 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleTepiKananClick(2)} 
            />
            <div>Ringan</div>
          </div>
          <div className="flex items-center">
            <img 
              src={TepiKanan === 3 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleTepiKananClick(3)} 
            />
            <div>Berat</div>
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

