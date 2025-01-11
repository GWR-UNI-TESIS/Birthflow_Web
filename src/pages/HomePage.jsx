import React, { useEffect, useState } from 'react';
import { useAxios } from '../hooks/use-axios';
import { useAuth } from '../contexts/auth-context';

const HomePage = () => {
    const api = useAxios();
    const { logout } = useAuth();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api/account/me');
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, [api]);

    return (
        <div>
            <h1>Bienvenido</h1>
            {data ? <p>Hola, {data.name}</p> : <p>Cargando...</p>}
            <button onClick={logout}>Cerrar Sesión</button>
        </div>
    );
};

export default HomePage;
