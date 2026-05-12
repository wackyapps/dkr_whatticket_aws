import axios from "axios";
import { getBackendURL } from "../services/config";

const api = axios.create({
	baseURL: getBackendURL(),
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	if (config.url && config.url.startsWith("/")) {
		config.url = config.url.substring(1);
	}
	return config;
});

export const openApi = axios.create({
	baseURL: getBackendURL()
});

openApi.interceptors.request.use((config) => {
	if (config.url && config.url.startsWith("/")) {
		config.url = config.url.substring(1);
	}
	return config;
});

export default api;
