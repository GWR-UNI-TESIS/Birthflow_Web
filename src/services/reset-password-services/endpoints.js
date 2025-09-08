// Endpoints para restablecer contraseña
const RESET_PASSWORD_ENDPOINTS = {
  RESET_PASSWORD: {
    // Solicitar código de verificación (OTP)
    REQUEST_RESET_CODE: '/api/account/request-reset-code',
    // Validar OTP
    VALIDATE_OTP: '/api/account/validate-otp-code',
    // Restablecer contraseña
    RESET_PASSWORD: '/api/account/reset-password',
  },
};

export { RESET_PASSWORD_ENDPOINTS };
