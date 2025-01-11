import FingerprintJS from '@fingerprintjs/fingerprintjs';

const getDeviceId = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId; // Retorna un ID único del dispositivo
};