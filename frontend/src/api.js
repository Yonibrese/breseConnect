import axios from 'axios';

const currentHostname = window.location.hostname; 

const API = axios.create({
    baseURL: `http://${currentHostname}:8000/api/`, 
    timeout: 5000,
    withCredentials: true, // Continues to ensure cookies travel with requests
});

// 1. Helper function to extract a cookie value by its name from the browser storage
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Check if this cookie string begins with the name we want
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// 2. Request Interceptor: Intercepts every outgoing request and manually injects 
// the CSRF token into the headers, bypassing Axios's cross-port limitations.
API.interceptors.request.use(
    (config) => {
        const csrfToken = getCookie('csrftoken');
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
