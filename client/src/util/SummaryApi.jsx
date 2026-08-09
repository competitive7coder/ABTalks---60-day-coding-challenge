export const baseURL = import.meta.env.VITE_BACKEND_URL

const SummaryApi = {
    register: {
        url: "/sign-up",
        method: "post"
    },
    sign_in: {
        url: "/sign-in",
        method: "post"
    },
    refreshToken: {
        url: "/refreshToken",
        method: "get"
    },
    getCurrentUserDetails : {
        url : "/me",
        method : "get"
    },
    logout : {
        url : "/logout",
        method : "post"
    }
}

export default SummaryApi