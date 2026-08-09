const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

// Helper to make fetch requests with credentials automatically
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Set headers and credentials
    const defaultHeaders = {};
    if (options.body && !(options.body instanceof FormData)) {
        defaultHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        credentials: "include", // Essential for cookie-based authentication
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }
    return data;
}

export const signUp = (name, email, password) => {
    return apiRequest("/sign-up", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
};

export const signIn = (email, password) => {
    return apiRequest("/sign-in", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
};

export const logOut = () => {
    return apiRequest("/logout", {
        method: "POST",
    });
};

export const getCurrentUser = () => {
    return apiRequest("/me", {
        method: "GET",
    });
};

export const createChallenge = (track , linkedin , github) => {
    return apiRequest("/api/challenge/create", {
        method: "POST",
        body: JSON.stringify({ track }),
    });
};

export const getCurrentChallenge = () => {
    return apiRequest("/api/challenge/current", {
        method: "GET",
    });
};

export const getChallengeByDay = (day) => {
    return apiRequest(`/api/challenge/${day}`, {
        method: "GET",
    });
};

export const submitChallenge = (payload) => {
    return apiRequest("/api/challenge/submit", {
        method: "POST",
        body: JSON.stringify(payload),
    });
};

export const getSubmissions = () => {
    return apiRequest("/api/challenge/submissions/all", {
        method: "GET",
    });
};

export const getLeaderboard = () => {
    return apiRequest("/leaderboard", {
        method: "GET",
    });
};

export const getAdminTasks = () => {
    return apiRequest("/api/tasks", {
        method: "GET",
    });
};

export const createAdminTask = (payload) => {
    return apiRequest("/api/tasks", {
        method: "POST",
        body: JSON.stringify(payload),
    });
};

export const updateAdminTask = (id, payload) => {
    return apiRequest(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
};

export const deleteAdminTask = (id) => {
    return apiRequest(`/api/tasks/${id}`, {
        method: "DELETE",
    });
};

export const getAdminStats = () => {
    return apiRequest("/api/admin/stats");
};
