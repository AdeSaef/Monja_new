import { KondisiBahu } from "./Bahu/KondisiBahu";
export const BahuSaluran = ({ data }) => {
  return (
    <div className="w-full p-2">
      <div className="text-center font-bold">
        Bahu, Saluran Samping, Dan lain lain
      </div>
      <KondisiBahu />
    </div>
  );
};
