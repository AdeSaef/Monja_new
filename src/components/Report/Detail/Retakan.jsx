export const Retakan = ({ data }) => {
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
          <div>Tidak Ada</div>
          <div>Tidak Berhubungan</div>
          <div>Saling Berhubungan (Berbidang Luas)</div>
          <div>Saling Berhubungan (Berbidang Sempit)</div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Lebar</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div>Tidak Ada</div>
          <div>Halus &lt; 1mm</div>
          <div>Sedang 1-5mm</div>
          <div>lebar &gt; 5mm</div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">% Luas</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div>Tidak Ada</div>
          <div>&lt;10% luas</div>
          <div>10 - 30% luas</div>
          <div>&gt;30% luas</div>
        </div>
      </div>
    </>
  );
};
