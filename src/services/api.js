import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL; // substitua pelo URL base da sua API

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para adicionar o token de autenticação a cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar a resposta do servidor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Se o status code for 401 e a requisição não foi tentada novamente
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Fazer a chamada para o serviço de refresh token
      try {
        var userId = JSON.parse(localStorage.getItem("user")).id;
        var refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${BASE_URL}/auth/refreshToken?userId=${userId}&refreshToken=${refreshToken}`);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        // Reenviar a requisição original com o novo token
        originalRequest.headers["Authorization"] = `Bearer ${response.data.token}`;
        return api(originalRequest);
      } catch (error) {
        // Se o refresh token falhar, remover o usuário do localStorage e redirecionar para a página de login
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const get = async (route) => {
  try {
    const response = await api.get(route);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const remove = async (route, id) => {
  try {
    const response = await api.delete(`${route}/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const post = async (route, data) => {
  try {
    const response = await api.post(route, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const put = async (route, data, id) => {
  try {
    const response = await api.put(`${route}/${id}`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default api;
