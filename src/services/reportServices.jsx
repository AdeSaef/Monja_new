import { lokalApi } from "../api/axios";


export const updateDetailReport = async (id, formData) => {
  try {
    const response = await lokalApi.patch(
      `final-report/update/${id}`,
      formData
    );
    console.log("Response dari API:", response);

    if (response.data.success) {
      alert(response.data.message);
    } else {
      console.error(response.message);
      return null;
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengupdate detail laporan", error);
    return null;
  }
};
export const updateFormSurvey = async (id, updatedData) => {
  try {
    const response = await lokalApi.patch(
      `final-report/update/formSurvey/${id}`,
      updatedData
    );
    console.log("Response dari API:", response);

    if (response.data.success) {
      alert(response.data.message);
    } else {
      console.error(response.message);
      return null;
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengupdate Form Survey", error);
    return null;
  }
};

export const koordinatRuteGuid = async (guid) =>{
  try {
    const response = await lokalApi.get(`/final-report/kordinate/${guid}`);
    // console.table(response.data.data);
    if (response.data.success) {
      return response.data.data;
    } else {
      console.error(response.message);
      return null;
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengupdate Form Survey", error);
    return null;
  }
}

