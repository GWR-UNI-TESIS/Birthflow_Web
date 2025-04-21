import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const getDeviceInfo = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId; // Retorna un ID único del dispositivo
};