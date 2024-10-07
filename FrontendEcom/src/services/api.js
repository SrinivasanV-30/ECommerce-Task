import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const login = (email, password) => {
    return axios.post(`${API_BASE_URL}/login`, { email, password });
};

export const signup = (user) => {
    return axios.post(`${API_BASE_URL}/register`, user);
};

export const getAllCategories = () => {
    return axios.get(`${API_BASE_URL}/categories`);
};

export const getCategoryById = (id) => {
    return axios.get(`${API_BASE_URL}/categories/${id}`);
};
