export const KerusakanLain = ({ data }) => {
  return (
    <>
      <div className="text-center font-bold">Kerusakan Lain</div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-bold">Label</div>
        <div className="w-full h-full font-bold pl-2">Kondisi</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Jumlah Lubang</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div>Tidak Ada</div>
          <div>Kurang Dari 10/Km</div>
          <div>10-15/Km</div>
          <div>Lebih dari 50/Km</div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Ukuran Lubang</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div>Tidak Ada</div>
          <div>Kecil - Dangkal</div>
          <div>Kecil - Dalam</div>
          <div>Besar - Dangkal</div>
          <div>Besar - Dalam</div>
        </div>
      </div>
      <div className="border-y-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Bekas Roda</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div>Tidak Ada</div>
          <div>Kurang dari 1cm dalam</div>
          <div>1 - 3 cm dalam</div>
          <div>lebih dari 3 cm</div>
        </div>
      </div>
      <div className="text-center font-bold my-2">Kerusakan Tepi</div>
      <div className="border-t-2 w-full h-full flex">
        <div className="w-1/2 h-full text-center">KR</div>
        <div className="w-1/2 h-full text-center">KN</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div>Tidak Ada</div>
          <div>Ringan</div>
          <div>Berat</div>
        </div>
        <div className="w-1/2 h-full ml-4 flex flex-col pl-2">
          <div>Tidak Ada</div>
          <div>Ringan</div>
          <div>Berat</div>
        </div>
      </div>
    </>
  );
};
