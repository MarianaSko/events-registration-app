import axios from "axios";

export const api = axios.create({
    baseURL: 'https://events-registration-app-backend-cra4.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});