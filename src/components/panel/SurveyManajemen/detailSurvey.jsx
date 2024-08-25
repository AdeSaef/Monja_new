import { detailData } from "./detailEx";

const DetailTable = ({ data }) => {
  return (
    <div className="container mx-auto p-0">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border">No.</th>
            <th className="py-2 border">GUID Survey</th>
            <th className="py-2 border">GUID Ruas</th>
            <th className="py-2 border">Ruas</th>
            <th className="py-2 border">Nama File Video</th>
            <th className="py-2 border">Surveyor</th>
            <th className="py-2 border">Tanggal Survey</th>
            <th className="py-2 border">Uploader</th>
            <th className="py-2 border">Tanggal Upload</th>
            <th className="py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((survey, index) => (
            <tr key={index} className="text-center border-b">
              <td className="py-2 border">{index + 1}</td>
              <td className="py-2 border">{survey.guid_survey}</td>
              <td className="py-2 border">{survey.guid_ruas}</td>
              <td className="py-2 border">{survey.ruas}</td>
              <td className="py-2 border">{survey.nama_file_video}</td>
              <td className="py-2 border">{survey.surveyor}</td>
              <td className="py-2 border">{survey.tgl_survey}</td>
              <td className="py-2 border">{survey.uploader || "-"}</td>
              <td className="py-2 border">{survey.tgl_upload || "-"}</td>
              <td
                className={`py-2 border ${
                  survey.status === "belum upload" ? "bg-red-500" : "bg-green-500"
                } rounded-xl`}
              >
                {survey.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DetailSurvey = ({ onClose, surveyId }) => {

  return (
    <div className="container z-50" onClick={onClose}>
      <div className="fixed top-0 min-h-full w-full bg-gray-700 opacity-70 p-0"onClick={onClose}></div>
      <div className="absolute top-0 h-screen w-screen min-h-full max-w-none flex flex-col py-auto z-50 overflow-hidden">
        <div>
          <h1
            className="text-3xl text-white font-semibold mt-20 ml-20 z-50 cursor-pointer"
            onClick={onClose}
          >
            X
          </h1>
        </div>
        <div>
          <h1 className="text-3xl text-white font-semibold mt-10 ml-32 z-50" onClick={onClose}>
            DETAIL MANAJEMEN SURVEY
          </h1>
        </div>
        <div className="mt-20 border-4 border-gray-500 bg-white rounded-3xl mx-40 h-auto overflow-hidden p-0">
          <DetailTable data={detailData} className="w-full z-50"/>
        </div>
        <div className="flex mt-3 ml-40">
          <button className="bg-gray-400 mx-1 px-5 text-white rounded-sm hover:bg-gray-500">
            sebelumnya
          </button>
          <button className="bg-gray-400 mx-1 px-5 text-white rounded-sm hover:bg-gray-500">
            selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSurvey;
