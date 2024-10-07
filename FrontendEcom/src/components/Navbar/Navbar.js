import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('sessionKey'); 
        alert('Logout Successful!'); 
        navigate('/'); 
    };

    return (
        <nav className="bg-blue-500 p-4 flex justify-between items-center" style={{ margin: 0 }}>
            <h1
                className="text-white text-2xl font-bold cursor-pointer"
                onClick={() => navigate('/categories')}
            >
                eCommerce
            </h1>
            <button
                onClick={() => {
                    onLogout(); 
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
