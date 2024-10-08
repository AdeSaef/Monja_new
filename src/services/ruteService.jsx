import { serverApi } from "../api/axios";


export const getRuteData = async (page) => { 
  try {
    const ruteData = await serverApi.get(`/rute/get?page=${page ? page : 1}&keyword=383c0103-76a6-4c12-bd84-499d4f8e2579`);
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
    const ruteData = await serverApi.get(`/rute/get/company?keyword=383c0103-76a6-4c12-bd84-499d4f8e2579`);
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
    const ruteDetail = await serverApi.get(`/rute/get/guid/${guid}`);
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
    const ruteDetail = await serverApi.get(`/rute/get/guid/${ID}`)
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
    const rutekoordinat = await serverApi.get(`final-report/get/kordinate/?guid_rute=${rute}&tanggal_survey=${tgl}`)
    if  (rutekoordinat.data.success) { 
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
    const deleteRute = await serverApi.delete(`/rute/delete/guid/${guid}`)
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
    const createRute = await serverApi.post(`/rute/app`,formData)
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