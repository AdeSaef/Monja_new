import axios from 'axios';

export const userApi = axios.create({
    baseURL: 'https://api-sso.lskk.co.id/v1/',
});

//api projek
export const serverApi = axios.create({
    baseURL: 'https://monja.pptik.id/api/',
});

// api lokal
export const lokalApi = axios.create({
    baseURL: 'http://192.168.10.107:5092/',
});
// export const lokalApi = axios.create({
//     baseURL: 'http://localhost:5092/',
// });

//guid Application
export const guidAplication = "PROJECT-dd872261-8665-4b22-b052-9ba09053ce73-2024";
