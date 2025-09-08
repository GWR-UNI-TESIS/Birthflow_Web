// Endpoints del módulo de cuenta (centraliza rutas HTTP relacionadas a Account)
const ACCOUNT_ENDPOINTS = {
  ACCOUNT: {
    // Actualiza datos básicos del usuario (perfil)
    UPDATE_USER_INFO: '/api/account/change-user-info',

    // Cambia la contraseña del usuario autenticado
    // OJO: revisa si debe llevar "/" inicial para mantener consistencia con la ruta de arriba
    UPDATE_USER_PASSWORD: 'api/account/change-password',
  },
};

export { ACCOUNT_ENDPOINTS };
