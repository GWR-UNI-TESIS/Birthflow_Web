import React, { createContext, useContext, useEffect, useState } from 'react';
import { plainAxios } from '../services/api';
import { Spin } from 'antd';
const CatalogContext = createContext();

export const useCatalog = () => useContext(CatalogContext);

export const CatalogProvider = ({ children }) => {
    const [catalogs, setCatalogs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <Spin fullscreen></Spin>; // Puedes personalizar el mensaje o agregar un spinner
    }

    return (
        <CatalogContext.Provider value={{ catalogs, loading, error }}>
            {children}
        </CatalogContext.Provider>
    );
};