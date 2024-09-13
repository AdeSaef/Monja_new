export const KondisiBahu = () => {
  return (
    <div className="border w-full p-2">
      <div className="text-center font-semibold pb-2 border-b w-full">Kondisi Bahu</div>
      <div className="text-center w-full">Kondisi Bahu</div>
      <div className="border-t-2 w-full h-full flex">
        <div className="w-1/2 text-center">KR</div>
        <div className="w-1/2 text-center">KN</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div>Tidak Ada</div>
          <div>Baik/Rata</div>
          <div>Bekas rd/Erosi Ringan</div>
          <div>Bekas rd/Erosi Berat</div>
        </div>
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div>Tidak Ada</div>
          <div>Baik/Rata</div>
          <div>Bekas rd/Erosi Ringan</div>
          <div>Bekas rd/Erosi Berat</div>
        </div>
      </div>
    </div>
  );
};
