import apiClient from "../settings/HttpRequests.tsx";

export const fetchData = async () => {
    try {
        const response = await apiClient.get('/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};