import axios from 'axios';

export const userApi = axios.create({
    baseURL: 'https://sso.pptik.id/api/v1/',
});

//api projek

//guid Application
export const guidAplication = "PROJECT-dd872261-8665-4b22-b052-9ba09053ce73-2024";
