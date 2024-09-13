
export const KondisiJalan = ({ data }) => {
  return (
    <div className="w-full p-2">
      <select className="form-select block w-full mt-1 border-2 p-2">
        <option>BAIK</option>
        <option>SEDANG</option>
        <option>RUSAK RINGAN</option>
        <option>RUSAK BERAT</option>
      </select>
    </div>
  );
};
