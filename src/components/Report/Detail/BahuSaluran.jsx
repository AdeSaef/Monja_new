import { KondisiBahu } from "./Bahu/KondisiBahu";
import { KerusakanLereng } from "./Bahu/KerusakanLereng";
import { PermukaanBahu} from "./Bahu/PermukaanBahu";
import { Trotoar } from "./Bahu/Trotoar";
import { SaluranSamping } from "./Bahu/KondisiSamping";
import { useState } from "react";

export const BahuSaluran = ({ data }) => {
  const [isKondisi, setOnKondisi] = useState(true);
  const [isLereng, setOnLereng] = useState(false);
  const [isBahu, setOnBahu] = useState(false);
  const [isTrotoar, setOnTrotoar] = useState(false);
  const [isSaluran, setOnSaluran] = useState(false);

  const onKondisi = () => {
    setOnKondisi(true);
    setOnLereng(false);
    setOnBahu(false);
    setOnTrotoar(false);
    setOnSaluran(false);
  }

  const onLereng = () => {
    setOnKondisi(false);
    setOnLereng(true);
    setOnBahu(false);
    setOnTrotoar(false);
    setOnSaluran(false);
  }

  const onBahu = () => {
    setOnKondisi(false);
    setOnLereng(false);
    setOnBahu(true);
    setOnTrotoar(false);
    setOnSaluran(false);
  }

  const onTrotoar = () => {
    setOnKondisi(false);
    setOnLereng(false);
    setOnBahu(false);
    setOnTrotoar(true);
    setOnSaluran(false);
  }

  const onSaluran = () => {
    setOnKondisi(false);
    setOnLereng(false);
    setOnBahu(false);
    setOnTrotoar(false);
    setOnSaluran(true);
  }

  return (
    <div className="w-full p-2">
      <div className="text-center font-bold">
        Bahu, Saluran Samping, Dan lain lain
      </div>
      {isKondisi && <KondisiBahu data={data} onBahu={onBahu}/>}
      {isBahu && <PermukaanBahu data={data} onSaluran={onSaluran} onKondisi={onKondisi}/>}
      {isSaluran && <SaluranSamping data={data} onBahu={onBahu} onLereng={onLereng}/>}
      {isLereng && <KerusakanLereng data={data} onTrotoar={onTrotoar} onSaluran={onSaluran}/>}
      {isTrotoar && <Trotoar data={data} onLereng={onLereng}/>}
    </div>
  );
};
