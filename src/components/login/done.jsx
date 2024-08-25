import React from "react";
import { useNavigate } from "react-router-dom";

function Berhasil() {
  const navigate = useNavigate();
  const directbutton = () => {
    navigate("/login");
  };
  return (
    <div>
      <div className="mx-4 mt-0">
        Reset Password berhasil silahkan login kembali
      </div>
      <div className="absolute bottom-4 right-4">
        <button
          type="submit"
          className={`w-28 bg-blue-900 text-white p-1 rounded-md hover:bg-blue-700`}
          onClick={directbutton}
        >
          Konfirmasi
        </button>
      </div>
    </div>
  );
}

export default Berhasil;
