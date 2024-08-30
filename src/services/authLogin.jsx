import { useNavigate } from "react-router-dom";
import { userApi } from "../api/axios";
import { getRoleFromToken } from "../utils/utils";
import { useNavigate } from "react-router-dom";



export const handleLogin = async (email, password) => {
  const navigate = useNavigate();
  const guidAplication = defaultData.guidAplication;
  try {
    const response = await userApi.post("/users/login", { email, password, guidAplication });

    if (response.data.success) {
      alert(response.data.message);
      const userToken = getRoleFromToken(response.data.userToken);
      localStorage.setItem('userRole', userToken); 
      navigate("/");
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert("Terjadi kesalahan saat melakukan login");
    console.error("Error:", error);
  }
};
