import { serverApi } from "../api/axios";

export const getImage = async (fileName) => {
    try {
      const response = await serverApi.get(`/ftv/image/${fileName}`, {
        responseType: 'blob', // Mendapatkan response sebagai Blob untuk file biner
      });
  
      if (response) {
        // Membuat URL dari Blob untuk ditampilkan sebagai gambar
        const imageURL = URL.createObjectURL(response.data);
        return imageURL; // Mengembalikan URL gambar
      } else {
        console.error('Gagal mendapatkan gambar');
        return null;
      }
    } catch (error) {
      console.error(`Error fetching image for ${fileName}:`, error);
      return null;
    }
  };
  