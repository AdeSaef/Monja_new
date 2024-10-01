// import React, { useEffect, useState } from "react";
// import { Validation } from "../../../services/verifikasi_data";

// const DetailTable = ({ data }) => {
//   return (
//     <div className="container mx-auto p-0">
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="py-2 border">No.</th>
//             <th className="py-2 border">GUID Survey</th>
//             <th className="py-2 border">GUID Ruas</th>
//             <th className="py-2 border">Ruas</th>
//             <th className="py-2 border">Nama File Video</th>
//             <th className="py-2 border">Surveyor</th>
//             <th className="py-2 border">Tanggal Survey</th>
//             <th className="py-2 border">Uploader</th>
//             <th className="py-2 border">Tanggal Upload</th>
//             <th className="py-2 border">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((survey, index) => (
//             <tr key={index} className="text-center border-b">
//               <td className="py-2 border">{index + 1}</td>
//               <td className="py-2 border">{survey.guid_survey}</td>
//               <td className="py-2 border">{survey.guid_rute}</td>
//               <td className="py-2 border">{survey.rute}</td>
//               <td className="py-2 border">{survey.namafiles}</td>
//               <td className="py-2 border">{survey.surveyor}</td>
//               <td className="py-2 border">{survey.tanggal_survey}</td>
//               <td className="py-2 border">{survey.uploader || "-"}</td>
//               <td className="py-2 border">{survey.tanggal_upload || "-"}</td>
//               <td
//                 className={`py-2 border ${
//                   survey.status === "belum upload"
//                     ? "bg-red-500"
//                     : "bg-green-500"
//                 } rounded-xl`}
//               >
//                 {survey.status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const DetailDataSurvey = ({ onClose, surveyId }) => {
//   if (!Validation()) {
//     return <Navigate to="/login" />;
//   }

//   const [detailSurvey, setDetailSurvey] = useState([]);

//   useEffect(() => {
//     const fetchSurveyDetail = async () => {
//       try {
//         const surveyDetail = await getSurveybyId(surveyId);
//         console.log("Survey detail:", surveyDetail); // Memeriksa data dari API
//         setDetailSurvey([surveyDetail]);
//       } catch (error) {
//         console.error("Error fetching survey data:", error);
//       }
//     };
//     fetchSurveyDetail();
//   }, [surveyId]);
  

//   return (
//     <div className="fixed h-screen w-screen" onClick={onClose}>
//       <div className="h-full mt-9 select-none flex flex-col">
//         <div className="absolute bg-black opacity-80 top-9 left-0 w-full h-full z-50"></div>
//         <div className="z-50">
//           <h1
//             className="flex justify-center text-3xl w-8 ml-2 mt-2 text-white font-semibold cursor-pointer"
//             onClick={onClose}
//           >
//             X
//           </h1>
//         </div>
//         <div>
//           <h1 className="text-3xl text-white font-semibold mt-10 ml-32 z-50">
//             DETAIL MANAJEMEN SURVEY
//           </h1>
//         </div>
//         <div className="mt-20 border-4 border-gray-500 bg-white rounded-3xl mx-40 h-auto overflow-hidden p-0">
//           <DetailTable data={detailSurvey} className="w-full z-50" />
//         </div>
//         <div className="flex mt-3 ml-40">
//           <button className="bg-gray-400 mx-1 px-5 text-white rounded-sm hover:bg-gray-500">
//             sebelumnya
//           </button>
//           <button className="bg-gray-400 mx-1 px-5 text-white rounded-sm hover:bg-gray-500">
//             selanjutnya
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailDataSurvey;
