import { useEffect, useState } from "react";
import checked from "../../../../assets/Checked.png";
import unchecked from "../../../../assets/Unchecked.png";
import arrow from "../../../../assets/button/arrow.png";

export const Trotoar = ({ data, onLereng, onUpdate }) => {
  const [Kiri, setKiri] = useState(1);
  const [Kanan, setKanan] = useState(1);
  const moreData = data.FORM_SURVEY;

  useEffect(() => {
    const TrotoarKiri = {
      "Tidak ada": 1,
      "Baik/Aman": 2,
      "Berbahaya": 3,
    };
    setKiri(TrotoarKiri[moreData.SHOULDER_CHANNEL_SIDE.SIDEWALK_LEFT] || 1);

    const TrotoarKanan = {
      "Tidak ada": 1,
      "Baik/Aman": 2,
      "Berbahaya": 3,
    };
    setKanan(TrotoarKanan[moreData.SHOULDER_CHANNEL_SIDE.SIDEWALK_RIGHT] || 1);
  }, [moreData]);

  const handleUpdate = () => {
    const updatedData = {
      SIDEWALK_LEFT: Kiri,
      SIDEWALK_RIGHT: Kanan,
    };
    onUpdate(updatedData);
  };

  return (
    <div className="border w-full p-2">
      <div className="text-center font-semibold pb-2 border-b w-full relative">
        <div>Trotoar</div>
        <div
          className="absolute top-0 left-2 w-10 h-10 select-none cursor-pointer"
          onClick={() => onLereng()}
        >
          <img src={arrow} className="rotate-180" />
        </div>
      </div>
      <div className="text-center w-full">Trotoar</div>
      <div className="border-t-2 w-full h-full flex">
        <div className="w-1/2 text-center">KR</div>
        <div className="w-1/2 text-center">KN</div>
      </div>
      <div className="border-y-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div className="flex items-center">
            <img
              src={Kiri === 1 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => setKiri(1)}
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img
              src={Kiri === 2 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => setKiri(2)}
            />
            <div>Baik/Aman</div>
          </div>
          <div className="flex items-center">
            <img
              src={Kiri === 3 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => setKiri(3)}
            />
            <div>Berbahaya</div>
          </div>
        </div>
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div className="flex items-center">
            <img
              src={Kanan === 1 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => setKanan(1)}
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img
              src={Kanan === 2 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => setKanan(2)}
            />
            <div>Baik/Aman</div>
          </div>
          <div className="flex items-center">
            <img
              src={Kanan === 3 ? checked : unchecked}
              className="w-4 h-4 mr-1 cursor-pointer"
              onClick={() => setKanan(3)}
            />
            <div>Berbahaya</div>
          </div>
        </div>
      </div>
      <div className="w-full text-center mt-4">
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};
