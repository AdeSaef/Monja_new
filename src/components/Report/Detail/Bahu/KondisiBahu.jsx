import { useEffect } from "react";
import checked from "../../../../assets/Checked.png";
import unchecked from "../../../../assets/Unchecked.png";
import arrow from "../../../../assets/button/arrow.png";
import { useState } from "react";

export const KondisiBahu = ({data, onBahu, onUpdate}) => {
  const [Kiri, setKiri] = useState(1);
  const [Kanan, setKanan] = useState(1);
  const moreData = data.FORM_SURVEY;

  useEffect(()=>{
    const KBahuKiri = {
      "Tidak ada": 1,
      "Baik/Rata": 2,
      "Bekas rd./Erosi ringan": 3,
      "Bekas rd./Erosi berat": 4,
    };
    setKiri(KBahuKiri[moreData.SHOULDER_CHANNEL_SIDE.LEFT_SHOULDER_CONDITION] || 1);
    const KBahuKanan = {
      "Tidak ada": 1,
      "Baik/Rata": 2,
      "Bekas rd./Erosi ringan": 3,
      "Bekas rd./Erosi berat": 4,
    };
    setKiri(KBahuKanan[moreData.SHOULDER_CHANNEL_SIDE.RIGHT_SHOULDER_CONDITION] || 1);
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
        <div>Kondisi Bahu</div>
        <div className="absolute top-0 right-2 w-10 h-10 select-none cursor-pointer" onClick={() => onBahu()}>
          <img src={arrow}/>
        </div>
      </div>
      <div className="text-center w-full">Kondisi Bahu</div>
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
            <div>Baik/Rata</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Kiri === 3 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => setKiri(3)} 
            />
            <div>Bekas rd/Erosi Ringan</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Kiri === 4 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => setKiri(4)} 
            />
            <div>Bekas rd/Erosi Berat</div>
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
            <div>Baik/Rata</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Kanan === 3 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => setKanan(3)} 
            />
            <div>Bekas rd/Erosi Ringan</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Kanan === 4 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => setKanan(4)} 
            />
            <div>Bekas rd/Erosi Berat</div>
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
