import { useState, useEffect } from "react";
import checked from "../../../assets/Checked.png"
import unchecked from "../../../assets/Unchecked.png"

export const KerusakanLain = ({ data }) => {
  const [Jumlah,setJumlah] =useState(1);
  const [Ukuran,setUkuran] =useState(1);
  const [BekasRoda,setBekas] =useState(1);
  const [TepiKiri,setTepiKiri] =useState(1);
  const [TepiKanan,setTepiKanan] =useState(1);


  useEffect(() => {
    switch (data.FORM_SURVEY.OTHER_DAMAGE.HOLE_NUMBER) {
      case "Tidak ada":
        setJumlah(1);
        break;
      case "<10/km":
        setJumlah(2);
        break;
      case "10-15/km":
        setJumlah(3);
        break;
      case ">50/km":
        setJumlah(4);
        break;
      default:
        setJumlah(1);
    }

    switch (data.FORM_SURVEY.OTHER_DAMAGE.HOLE_SIZE) {
      case "Tidak ada":
        setUkuran(1);
        break;
      case "Kecil-dangkal":
        setUkuran(2);
        break;
      case "Kecil-dalam":
        setUkuran(3);
        break;
      case "Besar-dangkal":
        setUkuran(4);
        break;
      case "Besar-dalam":
        setUkuran(4);
        break;
      default:
        setUkuran(1);
    }

    switch (data.FORM_SURVEY.OTHER_DAMAGE.EX_WHEEL) {
      case "Tidak ada":
        setBekas(1);
        break;
      case "<1 cm dalam":
        setBekas(2);
        break;
      case "1 - 3 cm dalam":
        setBekas(3);
        break;
      case "> 3 cm dalam":
        setBekas(4);
        break;
      default:
        setBekas(1);
    }

    switch (data.FORM_SURVEY.OTHER_DAMAGE.LEFT_DAMAGE_EDGE) {
      case "Tidak ada":
        setTepiKiri(1);
        break;
      case "Ringan":
        setTepiKiri(2);
        break;
      case "Berat":
        setTepiKiri(3);
        break;
      default:
        setTepiKiri(1);
    }

    switch (data.FORM_SURVEY.OTHER_DAMAGE.RIGHT_DAMAGE_EDGE) {
      case "Tidak ada":
        setTepiKanan(1);
        break;
      case "Ringan":
        setTepiKanan(2);
        break;
      case "Berat":
        setTepiKanan(3);
        break;
      default:
        setTepiKanan(1);
    }
  }, [data]);


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
            <img src={Jumlah === 1 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={Jumlah === 2 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Kurang Dari 10/Km</div>
          </div>
          <div className="flex items-center">
            <img src={Jumlah === 3 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>10-15/Km</div>
          </div>
          <div className="flex items-center">
            <img src={Jumlah === 4 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Lebih dari 50/Km</div>
          </div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Ukuran Lubang</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img src={Ukuran === 1 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={Ukuran === 2 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Kecil - Dangkal</div>
          </div>
          <div className="flex items-center">
            <img src={Ukuran === 3 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Kecil - Dalam</div>
          </div>
          <div className="flex items-center">
            <img src={Ukuran === 4 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Besar - Dangkal</div>
          </div>
          <div className="flex items-center">
            <img src={Ukuran === 5 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Besar - Dalam</div>
          </div>
        </div>
      </div>
      <div className="border-y-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Bekas Roda</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img src={BekasRoda === 1 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={BekasRoda === 2 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Kurang dari 1cm dalam</div>
          </div>
          <div className="flex items-center">
            <img src={BekasRoda === 3 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>1 - 3 cm dalam</div>
          </div>
          <div className="flex items-center">
            <img src={BekasRoda === 4 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>lebih dari 3 cm</div>
          </div>
        </div>
      </div>
      <div className="text-center font-bold my-2">Kerusakan Tepi</div>
      <div className="border-t-2 w-full h-full flex">
        <div className="w-1/2 h-full text-center">KR</div>
        <div className="w-1/2 h-full text-center">KN</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div className="flex items-center">
            <img src={TepiKiri === 1 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={TepiKiri === 2 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Ringan</div>
          </div>
          <div className="flex items-center">
            <img src={TepiKiri === 3 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Berat</div>
          </div>
        </div>
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
         <div className="flex items-center">
            <img src={TepiKanan === 1 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={TepiKanan === 2 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Ringan</div>
          </div>
          <div className="flex items-center">
            <img src={TepiKanan === 3 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Berat</div>
          </div>
        </div>
      </div>
    </>
  );
};
