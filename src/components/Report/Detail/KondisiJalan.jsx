import { useEffect } from "react";
import { useState } from "react";

export const KondisiJalan = ({ data, onUpdate }) => {
  const [Kondisi, setKondisi] = useState("");
  useEffect(()=>{
    if (data.FORM_SURVEY.PANJANG_KONDISI.BAIK === 25){
      setKondisi("BAIK");
    }
    else if (data.FORM_SURVEY.PANJANG_KONDISI.SEDANG===25){
      setKondisi("SEDANG");
    }
  else if (data.FORM_SURVEY.PANJANG_KONDISI.RUSAK_RINGAN===25){
    setKondisi("RUSAK_RINGAN");
  }
  else if (data.FORM_SURVEY.PANJANG_KONDISI.RUSAK_BERAT===25){
    setKondisi("RUSAK_BERAT");
  }
  }, [data.FORM_SURVEY.PANJANG_KONDISI.BAIK, data.FORM_SURVEY.PANJANG_KONDISI.SEDANG])

  const handleUpdate = () => {
    onUpdate(Kondisi);
  };

  return (
    <div className="w-full p-2">
      <select className="form-select block w-full mt-1 border-2 p-2" value={Kondisi} onChange={(e) => setKondisi(e.target.value)}>
        <option value="BAIK">BAIK</option>
        <option value="SEDANG">SEDANG</option>
        <option value="RUSAK_RINGAN">RUSAK RINGAN</option>
        <option value="RUSAK_BERAT">RUSAK BERAT</option>
      </select>
      <div className="flex justify-center">
        <button className="bg-green-500 text-white font-semibold py-2 px-8 rounded-md hover:bg-green-600 mt-2" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};
