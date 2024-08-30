import { userApi } from "../api/axios";

const userToken = localStorage.getItem("userToken");

const config = userToken
  ? { headers: { Authorization: `Bearer ${userToken}` } }
  : {};

export const getProfile = async () => {
  try {
    const response = await userApi.get("/users/profile", config);

    if (response.data.success) {
      return response.data.data;
    } else {
      console.error(response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mendapatkan profil", error);
    return null;
  }
};

export const uploadProfileImage = async (formData) => {
  try {
    const response = await userApi.post("/images/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const updatePassword = async (formData) => {
    console.log("/users/edit-password", formData, config);
  try {
    const response = await userApi.post("/users/edit-password", formData, config);
    return response.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateProfile = async (formData) => {
  try {
    const response = await userApi.post("/users/edit-profile", formData, config);
    return response.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
