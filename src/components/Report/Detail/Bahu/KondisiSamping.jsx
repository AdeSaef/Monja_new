import checked from "../../../../assets/Checked.png";
import unchecked from "../../../../assets/Unchecked.png";
import arrow from "../../../../assets/button/arrow.png";
import { useState,useEffect } from "react";

export const SaluranSamping = ({data, onLereng, onBahu}) => {
  const [Kiri, setKiri] = useState(1);
  const [Kanan, setKanan] = useState(1);
  const moreData = data.FORM_SURVEY;

  useEffect(()=>{
    const SaluranKiri = {
      "Tidak ada": 1,
      "Bersih": 2,
      "Tertutup/Tersumbat": 3,
      "Erosi": 4,
    };
    setKanan(SaluranKiri[moreData.SHOULDER_CHANNEL_SIDE.LEFT_CHANNEL_SIDE_CONDITION] || 1);
    const SaluranKanan = {
      "Tidak ada": 1,
      "Bersih": 2,
      "Tertutup/Tersumbat": 3,
      "Erosi": 4,
    };
    setKiri(SaluranKanan[moreData.SHOULDER_CHANNEL_SIDE.LEFT_CHANNEL_SIDE_CONDITION] || 1);
  }, [moreData])

  return (
    <div className="border w-full p-2">
      <div className="text-center font-semibold pb-2 border-b w-full relative">
        <div>Kondisi Saluran Samping</div>
        <div
          className="absolute top-0 left-2 w-10 h-10 select-none cursor-pointer"
          onClick={() => onBahu()}
        >
          <img src={arrow} className="rotate-180"/>
        </div>
        <div
          className="absolute top-0 right-2 w-10 h-10 select-none cursor-pointer"
          onClick={() => onLereng()}
        >
          <img src={arrow} />
        </div>
      </div>
      <div className="text-center w-full">Kondisi Saluran Samping</div>
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
            <div>Bersih</div>
          </div>
          <div className="flex items-center">
            <img src={Kiri === 3 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tertutup</div>
          </div>
          <div className="flex items-center">
            <img src={Kiri === 4 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tersumbat</div>
          </div>
          <div className="flex items-center">
            <img src={Kiri === 5 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Erosi</div>
          </div>
        </div>
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div className="flex items-center">
            <img src={Kanan === 1 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img src={Kanan === 2 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Bersih</div>
          </div>
          <div className="flex items-center">
            <img src={Kanan === 3 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tertutup</div>
          </div>
          <div className="flex items-center">
            <img src={Kanan === 4 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Tersumbat</div>
          </div>
          <div className="flex items-center">
            <img src={Kanan === 5 ? checked : unchecked} className="w-4 h-4 mr-1" />
            <div>Erosi</div>
          </div>
        </div>
      </div>
    </div>
  );
};
