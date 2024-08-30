import { serverApi, lokalApi } from "../api/axios";


export const getRuteData = async (page) => { 
  try {
    const ruteData = await lokalApi.get(`/rute/get?page=${page ? page : 1}&keyword=383c0103-76a6-4c12-bd84-499d4f8e2579`);
    // console.log(ruteData.data)
    
    if (ruteData.data.success) { // Perbaiki typo dari 'succes' menjadi 'success' jika perlu
      return {
        data: ruteData.data, // Data rute
        page: page, // Halaman saat ini
      };
    } else {
      console.error(ruteData.data.message);
      return null;
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mendapatkan data rute", error);
    return null;
  }
};
export const getRuteName = async () => { 
  try {
    const ruteData = await lokalApi.get(`/rute/get/company?keyword=383c0103-76a6-4c12-bd84-499d4f8e2579`);
    // console.log(ruteData.data)
    
    if (ruteData.data.success) { // Perbaiki typo dari 'succes' menjadi 'success' jika perlu
      return ruteData.data; // Data rute;
    } else {
      console.error(ruteData.data.message);
      return null;
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mendapatkan data rute", error);
    return null;
  }
};

export const getRuteDetail = async (guid) => { 
  try {
    const ruteDetail = await lokalApi.get(`/rute/get/guid/${guid}`);
    console.log(ruteDetail.data.data);
    
    if (ruteDetail.data.success) { // Perbaiki typo dari 'succes' menjadi 'success' jika perlu
      return ruteDetail.data.data;
    } else {
      console.error(ruteDetail.data.message);
      return null;
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mendapatkan data rute", error);
    return null;
  }
};


export const getRutebyId =async (ID)=>{ 
    try{
    const ruteDetail = await lokalApi.get(`/rute/get/guid/${ID}`)
    console.log (ruteDetail)
    if  (ruteDetail.data.success) { //-1 's'
        return ruteDetail.data.data;
      } else {
        console.error (ruteDetail.data.message);
        return null;
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mendapatkan data survey", error);
      return null;
    }
}
export const getKoordinatReport =async (rute,tgl)=>{ 
    try{
    const rutekoordinat = await lokalApi.get(`final-report/get/kordinate/?guid_rute=3ec16c53-e88a-46cc-b5cb-05389ee1a2786fsfgf&tanggal_survey=${tgl}`)
    console.log(rutekoordinat)
    if  (rutekoordinat.data.success) { 
        console.log(rutekoordinat.data.data);
        return rutekoordinat.data.data;
      } else {
        console.error (rutekoordinat.data.message);
        return null;
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mendapatkan data survey", error);
      return null;
    }
}
export const deleteRutebyGuid =async (guid)=>{ 
    try{
    const deleteRute = await lokalApi.delete(`/rute/delete/guid/${guid}`)
    console.log (deleteRute)
    if  (deleteRute.data.success) {
        return deleteRute.data.message;
      } else {
        console.error (deleteRute.data.message);
        return null;
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mendapatkan data survey", error);
      return null;
    }
}
export const CreateRute =async (formData)=>{ 
    try{
    const createRute = await lokalApi.post(`/rute/app`,formData)
    console.log (createRute)
    if  (createRute.data.success) {
        return createRute.data.message;
      } else {
        console.error (createRute.data.message);
        return null;
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mendapatkan data survey", error);
      return null;
    }
}