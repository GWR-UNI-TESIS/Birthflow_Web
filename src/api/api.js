import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const api = axios.create({
    baseURL: 'https://Birthflow.somee.com', // URL base única
});

// Obtener Device ID utilizando FingerprintJS
const getDeviceId = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
};

// Interceptor para incluir el Device ID en cada solicitud
api.interceptors.request.use(async (config) => {
    if (!config.headers['Device-Info']) {
        const deviceId = await getDeviceId();
        config.headers['Device-Info'] = deviceId; // Agregar al header
    }

    // Agregar el token de autorización si está disponible
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
});
export default api;
