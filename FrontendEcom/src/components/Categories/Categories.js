import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryItem from './CategoryItem';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Navbar from '../Navbar/Navbar';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10); 
    const navigate = useNavigate();

    const isAuth = (sessionKey) => {
        fetch('http://localhost:8080/api/isauth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: sessionKey })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                navigate("/categories"); 
            } else {
                setError('Session Expired');
                navigate('/');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setError('An error occurred in session auth.');
        });
    };

    useEffect(() => { 
        const sessionKey = localStorage.getItem('sessionKey');
        if (sessionKey) {
            isAuth(sessionKey);
        }
        
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/api/categories?page=${currentPage - 1}&size=${pageSize}`);
                if (response.data && response.data.success) {
                    setCategories(response.data.data.content || []); 
                    setTotalPages(response.data.data.totalPages || 0); 
                } else {
                    setError('Failed to fetch categories');
                }
            } catch (err) {
                setError('Error fetching categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [currentPage, pageSize]);
    const handleLogout = () => {
        localStorage.removeItem('sessionKey');
        alert('Logout Successful!');
        navigate('/'); 
    };
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleViewAllClick = () => {
        navigate('/all-products'); 
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        
        <div>
        <Navbar onLogout={handleLogout} />


        <div className="max-w-4xl mx-auto py-8">
            
            <h2 className="text-2xl font-bold text-center mb-4">Product Categories</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleViewAllClick}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    View All Products
                </button>
            </div>
            

            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories && categories.length > 0 ? (
                            categories.map(category => (
                                <CategoryItem key={category.id} category={category} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4">No categories available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            </div>
        </div>
        </div>
    );
};

export default Categories;
