export const Detail = ({data}) => {
  return (
    <>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Surveyor</div>
        <div className="border-2 w-full h-auto p-2">{data.surveyor}</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Tanggal Survey</div>
        <div className="border-2 w-full h-auto p-2">{data.tanggal_survey}</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Uploader</div>
        <div className="border-2 w-full h-auto p-2">{data.uploader}</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Tanggal Upload</div>
        <div className="border-2 w-full h-auto p-2">{data.tanggal_upload}</div>
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Station</div>
        <div className="border-2 w-full h-auto p-2">{data.station}</div>
      </div>
      <div className="border-y-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Kilometer</div>
        <div className="border-2 w-full h-auto p-2">{data.kilometer}</div>
      </div>
    </>
  );
};
