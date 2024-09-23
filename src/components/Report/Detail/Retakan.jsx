import { useState } from "react";
import unchecked from "../../../assets/Unchecked.png";
import checked from "../../../assets/Checked.png";
import { useEffect } from "react";

export const Retakan = ({ data }) => {
  const [Jenis, setJenis] = useState(1);
  const [Lebar, setLebar] = useState(1);
  const [Luas, setLuas] = useState(1);
  const moreData = data.FORM_SURVEY;

  useEffect(() => {
    if (moreData.CRACKS.TYPE === "Tidak ada") {
      setJenis(1);
    } else if (moreData.CRACKS.TYPE === "Tidak berhubungan") {
      setJenis(2);
    } else if (moreData.CRACKS.TYPE === "Saling berhubungan (Berbidang luas)") {
      setJenis(3);
    } else if (
      moreData.CRACKS.TYPE === "Saling berhubungan (Berbidang sempit)"
    ) {
      setJenis(4);
    }

    if (moreData.CRACKS.LARGE === "Tidak ada") {
      setLebar(1);
    } else if (moreData.CRACKS.LARGE === "Halus < 1 mm") {
      setLebar(2);
    } else if (moreData.CRACKS.LARGE === "Sedang 1 - 5 mm") {
      setLebar(3);
    } else if (moreData.CRACKS.LARGE === "Lebar > 5 mm") {
      setLebar(4);
    }

    if (moreData.CRACKS.WIDE === "Tidak ada") {
      setLuas(1);
    } else if (moreData.CRACKS.WIDE === "< 10% luas") {
      setLuas(2);
    } else if (moreData.CRACKS.WIDE === "10-30% luas") {
      setLuas(3);
    } else if (moreData.CRACKS.WIDE === "> 30% luas") {
      setLuas(4);
    }
    
  }, [moreData]);
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
              className="w-4 h-4 mr-1"
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img
              src={Jenis === 2 ? checked : unchecked}
              className="w-4 h-4 mr-1"
            />
            <div>Tidak Berhubungan</div>
          </div>
          <div className="flex items-center">
            <img
              src={Jenis === 3 ? checked : unchecked}
              className="w-4 h-4 mr-1"
            />
            <div>Saling Berhubungan (Berbidang Luas)</div>
          </div>
          <div className="flex items-center">
            <img
              src={Jenis === 4 ? checked : unchecked}
              className="w-4 h-4 mr-1"
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
              className="w-4 h-4 mr-1"
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img
              src={Lebar === 2 ? checked : unchecked}
              className="w-4 h-4 mr-1"
            />
            <div>Halus &lt; 1mm</div>
          </div>
          <div className="flex items-center">
            <img
              src={Lebar === 3 ? checked : unchecked}
              className="w-4 h-4 mr-1"
            />
            <div>Sedang 1-5mm</div>
          </div>
          <div className="flex items-center">
            <img
              src={Lebar === 4 ? checked : unchecked}
              className="w-4 h-4 mr-1"
            />
            <div>lebar &gt; 5mm</div>
          </div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">% Luas</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img
              src={Luas === 1 ? checked : unchecked}
              className="w-4 h-4 mr-1"
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img
              src={Luas === 2 ? checked : unchecked}
              className="w-4 h-4 mr-1"
            />
            <div>&lt;10% luas</div>
          </div>
          <div className="flex items-center">
            <img
              src={Luas === 3 ? checked : unchecked}
              className="w-4 h-4 mr-1"
            />
            <div>10 - 30% luas</div>
          </div>
          <div className="flex items-center">
            <img
              src={Luas === 4 ? checked : unchecked}
              className="w-4 h-4 mr-1"
            />
            <div>&gt;30% luas</div>
          </div>
        </div>
      </div>
    </>
  );
};
