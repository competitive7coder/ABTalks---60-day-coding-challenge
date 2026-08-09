import axios from 'axios'
import SummaryApi, { baseURL } from './SummaryApi'

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

Axios.interceptors.response.use(
    (response) => {
        localStorage.setItem("login", "true");
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        // Access token expired
        if (
            error?.response?.status === 401 &&
            !originalRequest?._retry
        ) {
            originalRequest._retry = true;

            try {
                // Do NOT get refreshToken from localStorage.
                // Browser automatically sends the HttpOnly cookie.
                const response = await Axios({
                    ...SummaryApi.refreshToken,
                    withCredentials: true
                });

                if (response?.data?.success) {
                    // Backend should set a new accessToken
                    // as an HttpOnly cookie.

                    localStorage.setItem("login", "true");
                    // setLoginGlobal(true);

                    // Retry the original request.
                    return Axios(originalRequest);
                }

            } catch (refreshError) {
                console.log("Refresh token failed:", refreshError);

                // Refresh token is invalid/expired
                localStorage.setItem("login", "false");
                // setLoginGlobal(false);

                window.location.href = "/";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default Axios