import axios from 'axios';

export const userApi = axios.create({
    baseURL: 'https://api-sso.lskk.co.id/v1/',
});

//api projek
export const serverApi = axios.create({
    baseURL: 'https://api-monja-garut.pptik.id/',
});

// api lokal
// export const lokalApi = axios.create({
//     baseURL: 'http://192.168.10.35:5092/',
// });

export const lokalApi = axios.create({
    baseURL: 'https://api-monja-garut.pptik.id/',
});

export const urlImageApi = 'http://ftp-monja.pptik.id/result';
// export const urlLokalApi = 'http://192.168.10.35:5092/';
export const urlLokalApi = 'https://api-monja-garut.pptik.id/';

//guid Application
export const guidAplication = "PROJECT-dd872261-8665-4b22-b052-9ba09053ce73-2024";
