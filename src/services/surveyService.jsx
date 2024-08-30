import { lokalApi, serverApi } from "../api/axios";


export const getSurveyData =async (page)=>{ 
    try{
    const surveyData = await lokalApi.get(`/survey/get?page=${page}`)
    console.log(surveyData)
    if (surveyData.data.success) { //-1 's'
        return surveyData.data;
      } else {
        console.error(surveyData.data.message);
        return null;
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mendapatkan data survey", error);
      return null;
    }
}

export const getSurveybyId =async (ID)=>{ 
    try{
    const surveyDetail = await lokalApi.get(`/survey/get/guid/${ID}`)
    console.log(surveyDetail)
    if (surveyDetail.data.success) { //-1 's'
        return surveyDetail.data.data;
      } else {
        console.error(surveyDetail.data.message);
        return null;
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mendapatkan data survey", error);
      return null;
    }
}