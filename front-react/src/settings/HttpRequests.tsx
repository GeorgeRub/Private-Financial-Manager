import axios from "axios";

const apiClient = axios.create({
    // baseURL: 'http://localhost:8000',
});

// Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add custom headers or other configurations
        config.headers.Authorization = `Bearer YOUR_TOKEN`;
        config.headers['Content-Type'] = 'application/json';
        console.log('Request:', config); // Debugging
        return config;
    },
    (error) => {
        // Handle request errors
        console.error('Request Error:', error);
        return Promise.reject(new Error(error));
    }
);

// Add a response interceptor
apiClient.interceptors.response.use(
    (response) => {
        // Modify the response if needed
        console.log('Response:', response); // Debugging
        return response;
    },
    (error) => {
        // Handle response errors
        if (error.response) {
            console.error('Response Error:', error.response);
        } else {
            console.error('Network Error:', error.message);
        }
        return Promise.reject(new Error(error));
    }
);

export default apiClient;