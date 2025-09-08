import React, { createContext, useContext, useEffect, useState } from 'react';
import { plainAxios } from '../services/api';
import { Spin } from 'antd';

const CatalogContext = createContext();

// Hook para consumir el contexto de catálogos
export const useCatalog = () => useContext(CatalogContext);

// Proveedor de catálogos (obtiene data desde la API y la expone vía contexto)
export const CatalogProvider = ({ children }) => {
    const [catalogs, setCatalogs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carga inicial de catálogos
    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const { data } = await plainAxios.get('/api/catalog');
                setCatalogs(data.response);
            } catch (err) {
                console.error('Error fetching catalogs:', err);
                setError('No se pudieron cargar los catálogos.');
            } finally {
                setLoading(false);
            }
        };

        fetchCatalogs();
    }, []);

    // Mientras carga, muestra spinner
    if (loading) {
        return <Spin fullscreen tip="Cargando ..." />;
    }

    return (
        <CatalogContext.Provider value={{ catalogs, loading, error }}>
            {children}
        </CatalogContext.Provider>
    );
};
