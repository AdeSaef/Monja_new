export const Kekerasan = ({ data }) => {
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
            <div className="w-4 h-4 flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
            <div>Baik/Rapat</div>
          </div>
          <div>Kasar</div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">Keadaan</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div>Baik/tdk. ada Kelainan</div>
          <div>Aspal Berlebihan</div>
          <div>Lepas Lepas</div>
          <div>Hancur</div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">% Penurunan</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div>Tidak Ada</div>
          <div>Kurang dari 10% luas</div>
          <div>10 - 30% luas</div>
          <div>Lebih Dari 30% luas</div>
        </div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full">% Penambalan</div>
        <div className="w-full h-auto p-2 flex flex-col">
          <div>Tidak Ada</div>
          <div>Kurang dari 10% luas</div>
          <div>10 - 30% luas</div>
          <div>Lebih Dari 30% luas</div>
        </div>
      </div>
    </>
  );
};
