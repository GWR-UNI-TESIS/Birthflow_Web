
const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};
const formatDateInNicaragua = (dateString) => {
    // Reemplazamos el espacio por "T" para que JS lo reconozca como fecha ISO
    const isoString = dateString.replace(' ', 'T') + 'Z'; // Forzamos UTC

    const date = new Date(isoString);

    const options = {
        timeZone: 'America/Managua',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    return new Intl.DateTimeFormat('es-NI', options).format(date);
};


const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('es-NI', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};
const formatTimeNumeric = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export { formatDate, formatDateTime, formatTimeNumeric, formatDateInNicaragua };