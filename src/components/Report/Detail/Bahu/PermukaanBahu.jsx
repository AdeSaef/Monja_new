import checked from "../../../../assets/Checked.png";
import unchecked from "../../../../assets/Unchecked.png";
import arrow from "../../../../assets/button/arrow.png";
import { useState, useEffect } from "react";

export const PermukaanBahu = ({data, onSaluran, onKondisi}) => {
  const [Kiri, setKiri] = useState(1);
  const [Kanan, setKanan] = useState(1);
  const moreData = data.FORM_SURVEY;

  useEffect(()=>{
    const PBahuKiri = {
      "Tidak ada": 1,
      "Diatas permukaan Jalan": 2,
      "Rata dgn. Permukaan Jalan": 3,
      "Dibawah permukaan Jalan": 4,
      ">10 cm dibawah permukaan Jalan": 5,
    };
    setKiri(PBahuKiri[moreData.SHOULDER_CHANNEL_SIDE.LEFT_SHOULDER_SURFACE] || 1);
    const PBahuKanan = {
      "Tidak ada": 1,
      "Diatas permukaan Jalan": 2,
      "Rata dgn. Permukaan Jalan": 3,
      "Dibawah permukaan Jalan": 4,
      ">10 cm dibawah permukaan Jalan": 5,
    };
    setKanan(PBahuKanan[moreData.SHOULDER_CHANNEL_SIDE.RIGHT_SHOULDER_SURFACE] || 1);
  }, [moreData])

  return (
    <div className="border w-full p-2">
      <div className="text-center font-semibold pb-2 border-b w-full relative">
        <div>Permukaan Bahu</div>
        <div
          className="absolute top-0 left-2 w-10 h-10 select-none cursor-pointer"
          onClick={() => onKondisi()}
        >
          <img src={arrow} className="rotate-180"/>
        </div>
        <div
          className="absolute top-0 right-2 w-10 h-10 select-none cursor-pointer"
          onClick={() => onSaluran()}
        >
          <img src={arrow} />
        </div>
      </div>
      <div className="text-center w-full">Permukaan Bahu</div>
      <div className="border-t-2 w-full h-full flex">
        <div className="w-1/2 text-center">KR</div>
        <div className="w-1/2 text-center">KN</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div className="flex items-center">
            <img src={Kiri === 1 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={Kiri === 2 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Diatas Permukaan Jalan</div>
          </div>
          <div className="flex items-center">
            <img src={Kiri === 3 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Rata dgn. Permukaan Jalan</div>
          </div>
          <div className="flex items-center">
            <img src={Kiri === 4 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Dibawah Permukaan Jalan</div>
          </div>
          <div className="flex items-center">
            <img src={Kiri === 5 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>&gt;10cm Dibawah Permukaan Jalan</div>
          </div>
        </div>
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div className="flex items-center">
            <img src={Kanan === 1 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={Kanan === 2 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Diatas Permukaan Jalan</div>
          </div>
          <div className="flex items-center">
            <img src={Kanan === 3 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Rata dgn. Permukaan Jalan</div>
          </div>
          <div className="flex items-center">
            <img src={Kanan === 4 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Dibawah Permukaan Jalan</div>
          </div>
          <div className="flex items-center">
            <img src={Kanan === 5 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>&gt;10cm Dibawah Permukaan Jalan</div>
          </div>
        </div>
      </div>
    </div>
  );
};
