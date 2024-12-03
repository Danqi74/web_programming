import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PrivateRoute = ({ component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token in localStorage:', token);

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated === false) {
            console.log('Redirecting to login...');
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? component : null;
};