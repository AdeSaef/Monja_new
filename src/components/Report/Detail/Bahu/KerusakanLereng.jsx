import { useState, useEffect } from "react";
import checked from "../../../../assets/Checked.png";
import unchecked from "../../../../assets/Unchecked.png";
import arrow from "../../../../assets/button/arrow.png";

export const KerusakanLereng = ({data, onTrotoar, onSaluran, onUpdate}) => {
  const [Kiri, setKiri] = useState(1);
  const [Kanan, setKanan] = useState(1);
  const moreData = data.FORM_SURVEY;

  useEffect(()=>{
    const LerengKiri = {
      "Tidak ada": 1,
      "Longsor/Runtuh": 2,
    };
    setKiri(LerengKiri[moreData.SHOULDER_CHANNEL_SIDE.LEFT_SHOULDER_CONDITION] || 1);
    const LerengKanan = {
      "Tidak ada": 1,
      "Longsor/Runtuh": 2,
    };
    setKanan(LerengKanan[moreData.SHOULDER_CHANNEL_SIDE.RIGHT_SHOULDER_CONDITION] || 1);
  }, [moreData])

  const handleUpdate = () => {
    const updatedData = {
      LEFT_SHOULDER_CONDITION: Kiri,
      RIGHT_SHOULDER_CONDITION: Kanan,
    };
    onUpdate(updatedData);
  };

  return (
    <div className="border w-full p-2">
      <div className="text-center font-semibold pb-2 border-b w-full relative">
        <div>Kerusakan Lereng</div>
        <div
          className="absolute top-0 left-2 w-10 h-10 select-none cursor-pointer"
          onClick={() => onSaluran()}
        >
          <img src={arrow} className="rotate-180"/>
        </div>
        <div
          className="absolute top-0 right-2 w-10 h-10 select-none cursor-pointer"
          onClick={() => onTrotoar()}
        >
          <img src={arrow} />
        </div>
      </div>
      <div className="text-center w-full">Kerusakan Lereng</div>
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
            <div>Longsor/Runtuh</div>
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
            <div>Longsor/Runtuh</div>
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
