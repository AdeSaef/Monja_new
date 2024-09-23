import { useEffect } from "react";
import { useState } from "react";

export const KondisiJalan = ({ data }) => {
  const [Kondisi, setKondisi] = useState("");
  useEffect(()=>{
    if (data.PANJANG_KONDISI.BAIK===25){
      setKondisi("BAIK");
    }
    else if (data.PANJANG_KONDISI.SEDANG===25){
      setKondisi("SEDANG");
    }
  else if (data.PANJANG_KONDISI.RUSAK_RINGAN===25){
    setKondisi("RUSAK_RINGAN");
  }
  else if (data.PANJANG_KONDISI.RUSAK_BERAT===25){
    setKondisi("RUSAK_BERAT");
  }
  }, [data.PANJANG_KONDISI.BAIK, data.PANJANG_KONDISI.SEDANG])
  return (
    <div className="w-full p-2">
      <select className="form-select block w-full mt-1 border-2 p-2" value={Kondisi} onChange={(e) => setKondisi(e.target.value)}>
        <option value="BAIK">BAIK</option>
        <option value="SEDANG">SEDANG</option>
        <option value="RUSAK_RINGAN">RUSAK RINGAN</option>
        <option value="RUSAK_BERAT">RUSAK BERAT</option>
      </select>
    </div>
  );
};
