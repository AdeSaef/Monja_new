export const SaluranSamping = () => {
  return (
    <div className="border w-full p-2">
      <div className="text-center font-semibold pb-2 border-b w-full">
        Kondisi Saluran Samping
      </div>
      <div className="text-center w-full">Kondisi Saluran Samping</div>
      <div className="border-t-2 w-full h-full flex">
        <div className="w-1/2 text-center">KR</div>
        <div className="w-1/2 text-center">KN</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div>Tidak Ada</div>
          <div>Bersih</div>
          <div>Tertutup</div>
          <div>Tersumbat</div>
          <div>Erosi</div>
        </div>
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div>Tidak Ada</div>
          <div>Bersih</div>
          <div>Tertutup</div>
          <div>Tersumbat</div>
          <div>Erosi</div>
        </div>
      </div>
    </div>
  );
};
