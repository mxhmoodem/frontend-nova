import axios from 'axios'
// import { useAuth } from '../../hooks/useAuth/useAuth'

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL

// Axios instance
export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

api.interceptors.request.use(
    (response) => response,
    async (error) => {
        // Implement global error handling here
        return Promise.reject(error);
    }
)