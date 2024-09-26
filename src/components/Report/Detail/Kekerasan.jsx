import { useState } from "react";
import unchecked from "../../../assets/Unchecked.png"
import checked from "../../../assets/Checked.png"
import { useEffect } from "react";
export const Kekerasan = ({ data, onUpdate }) => {
  const [Order, setOrder] = useState(1);
  const [Condition, setCondition] = useState(1);
  const [Decrease, setDecrease] = useState(1);
  const [Patches, setPatches] = useState(1);
  const moreData = data.FORM_SURVEY;
  const [formData, setFormData] = useState({
    ORDER: moreData.SURFACE_HARDNESS.ORDER,
    CONDITION: moreData.SURFACE_HARDNESS.CONDITION,
    DECREASE: moreData.SURFACE_HARDNESS.DECREASE,
    PATCHES: moreData.SURFACE_HARDNESS.PATCHES,
  });

  useEffect(() => {
    const orderMap = {
      1: "Baik/Rapat",
      2: "Kasar",
    };
    const conditionMap = {
      1: "Baik/Tdk. Ada Kelainan",
      2: "Aspal berlebihan",
      3: "Lepas-lepas",
      4: "Hancur",
    };
    const decreaseMap = {
      1: "Tidak Ada",
      2: "<10% Luas",
      3: "10-30% Luas",
      4: ">30% Luas",
    };
    const patchesMap = {
      1: "Tidak Ada",
      2: "<10% Luas",
      3: "10-30% Luas",
      4: ">30% Luas",
    };

    setFormData({
      ORDER: orderMap[Order] || "Kasar",
      CONDITION: conditionMap[Condition] || "Baik/Tdk. Ada Kelainan",
      DECREASE: decreaseMap[Decrease] || "Tidak Ada",
      PATCHES: patchesMap[Patches] || "Tidak Ada",
    });
  }, [Order, Condition, Decrease, Patches]);
  
  useEffect(() => {
    const orderMap = {
      "Baik/Rapat": 1,
      default: 2,
    };
    setOrder(orderMap[moreData.SURFACE_HARDNESS.ORDER] || orderMap.default);

    const conditionMap = {
      "Baik/Tdk. Ada Kelainan": 1,
      "Aspal berlebihan": 2,
      "Lepas-lepas": 3,
      "Hancur": 4,
    };
    setCondition(conditionMap[moreData.SURFACE_HARDNESS.CONDITION] || 1);

    const decreaseMap = {
      "Tidak Ada": 1,
      "<10% Luas": 2,
      "10-30% Luas": 3,
      ">30% Luas": 4,
    };
    setDecrease(decreaseMap[moreData.SURFACE_HARDNESS.DECREASE] || 1);

    const patchesMap = {
      "Tidak Ada": 1,
      "<10% Luas": 2,
      "10-30% Luas": 3,
      ">30% Luas": 4,
    };
    setPatches(patchesMap[moreData.SURFACE_HARDNESS.PATCHES] || 1);
  }, [moreData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ORDER: Order,
      CONDITION: Condition,
      DECREASE: Decrease,
      PATCHES: Patches,
    };
    onUpdate(updatedData);
  };

  const handleOrderClick = (value) => {
    setOrder(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      ORDER: value === 1 ? "Baik/Rapat" : "Kasar",
    }));
  };

  const handleConditionClick = (value) => {
    setCondition(value);
    const conditionMap = {
      1: "Baik/Tdk. Ada Kelainan",
      2: "Aspal berlebihan",
      3: "Lepas-lepas",
      4: "Hancur",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      CONDITION: conditionMap[value],
    }));
  };

  const handleDecreaseClick = (value) => {
    setDecrease(value);
    const decreaseMap = {
      1: "Tidak Ada",
      2: "<10% Luas",
      3: "10-30% Luas",
      4: ">30% Luas",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      DECREASE: decreaseMap[value],
    }));
  };

  const handlePatchesClick = (value) => {
    setPatches(value);
    const patchesMap = {
      1: "Tidak Ada",
      2: "<10% Luas",
      3: "10-30% Luas",
      4: ">30% Luas",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      PATCHES: patchesMap[value],
    }));
  };

  return (
    <>
      <div className="text-center font-bold">Permukaan Kekerasan</div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-bold">Label</div>
        <div className="w-full h-full font-bold pl-2">Kondisi</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Susunan</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img 
              src={Order === 1 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleOrderClick(1)} 
            />
            <div>Baik/Rapat</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Order === 2 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleOrderClick(2)} 
            />
            <div>Kasar</div>
          </div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Keadaan</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img 
              src={Condition === 1 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleConditionClick(1)} 
            />
            <div>Baik/tdk. ada Kelainan</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Condition === 2 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleConditionClick(2)} 
            />
            <div>Aspal Berlebihan</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Condition === 3 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleConditionClick(3)} 
            />
            <div>Lepas Lepas</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Condition === 4 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleConditionClick(4)} 
            />
            <div>Hancur</div>
          </div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">% Penurunan</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img 
              src={Decrease === 1 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleDecreaseClick(1)} 
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Decrease === 2 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleDecreaseClick(2)} 
            />
            <div>Kurang dari 10% luas</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Decrease === 3 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleDecreaseClick(3)} 
            />
            <div>10 - 30% luas</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Decrease === 4 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handleDecreaseClick(4)} 
            />
            <div>Lebih Dari 30% luas</div>
          </div>
        </div>
      </div>
      <div className="border-y-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">% Penambalan</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div className="flex items-center">
            <img 
              src={Patches === 1 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handlePatchesClick(1)} 
            />
            <div>Tidak Ada</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Patches === 2 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handlePatchesClick(2)} 
            />
            <div>Kurang dari 10% luas</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Patches === 3 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handlePatchesClick(3)} 
            />
            <div>10 - 30% luas</div>
          </div>
          <div className="flex items-center">
            <img 
              src={Patches === 4 ? checked : unchecked} 
              className="w-4 h-4 mr-1 cursor-pointer" 
              onClick={() => handlePatchesClick(4)} 
            />
            <div>Lebih Dari 30% luas</div>
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
