import { useNavigate } from "react-router-dom";
import { userApi } from "../api/axios";
import { getRoleFromToken } from "../utils/utils";

const defaultData = {
  guidAplication: "PROJECT-dd872261-8665-4b22-b052-9ba09053ce73-2024",
  role: "admin",
  companyGuild: "COMPANY-b3465656-0f2b-4a70-801b-80a1e9cc7fb8-2024",
};

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
