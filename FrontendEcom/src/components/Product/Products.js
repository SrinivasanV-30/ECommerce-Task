import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Products = () => {
    const { id: categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);
    const [sort, setSort] = useState('name,asc');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const [filterType, setFilterType] = useState('price');
    const [filterValue, setFilterValue] = useState(1000); 
    const [filterEnabled, setFilterEnabled] = useState(false);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

    const isAuth = async (sessionKey) => {
        try {
            const response = await fetch('http://localhost:8080/api/isauth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: sessionKey }),
            });
            const data = await response.json();
            if (!data.success) {
                setError('Session Expired');
                localStorage.removeItem('sessionKey'); 
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred in session auth.');
            navigate('/');
        }
    };

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const categoryResponse = await axios.get(`http://localhost:8080/api/categories/${categoryId}`);
                setCategory(categoryResponse.data.data);
            } catch (err) {
                setError('Error fetching category details');
            }
        };

        const fetchProducts = async () => {
            setLoading(true);
            setError('');
            try {
                const filterParams = {};
                if (filterType === 'price') {
                    filterParams.minPrice = 0;
                    filterParams.maxPrice = filterValue;
                } else if (filterType === 'discount') {
                    filterParams.minDiscount = 0;
                    filterParams.maxDiscount = filterValue;
                } else if (filterType === 'quantity') {
                    filterParams.minQuantity = 0;
                    filterParams.maxQuantity = filterValue;
                }

                const response = await axios.get(`http://localhost:8080/api/products`, {
                    params: {
                        categoryId,
                        size: 1000,
                        sortField: sort.split(',')[0],
                        sortDir: sort.split(',')[1],
                        ...filterParams,
                    },
                });

                setProducts(response.data.data.content);
                applyFilters(response.data.data.content);
                setTotalPages(Math.ceil(response.data.data.content.length / pageSize));
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchCategoryDetails();
            fetchProducts();
        }

        const sessionKey = localStorage.getItem('sessionKey');
        if (sessionKey) {
            isAuth(sessionKey); 
        } else {
            navigate('/'); 
        }
    }, [categoryId, pageSize, sort, filterValue, filterType]);

    const applyFilters = (allProducts) => {
        let filteredProducts = allProducts || products;

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterEnabled) {
            filteredProducts = filteredProducts.filter(product => {
                if (filterType === 'price') return product.mrp <= filterValue;
                if (filterType === 'discount') return product.discount <= filterValue;
                if (filterType === 'quantity') return product.quantity <= filterValue;
                return true;
            });
        }

        setDisplayedProducts(filteredProducts);
        setTotalPages(Math.ceil(filteredProducts.length / pageSize));
        setCurrentPage(0);
    };

    useEffect(() => {
        applyFilters(products);
    }, [searchQuery, filterEnabled, filterType, filterValue]);

    useEffect(() => {
        const handler = setTimeout(() => {
            applyFilters(products);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, products]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setCurrentPage(0);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'filterType') {
            setFilterType(value);
            setFilterValue(value === 'price' ? 1000 : value === 'discount' ? 100 : 100); 
        } else if (name === 'filterValue') {
            setFilterValue(value);
        }
        setCurrentPage(0);
    };

    const handleLogout = () => {
        localStorage.removeItem('sessionKey');
        alert('Logout Successful!');
        navigate('/'); 
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleToggleFilter = () => {
        setFilterEnabled(!filterEnabled);
    };

    const toggleFilterDropdown = () => {
        setFilterDropdownOpen(!filterDropdownOpen);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><div className="loader"></div></div>;
    }

    const paginatedProducts = displayedProducts.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    return (
        <div>
            <Navbar onLogout={handleLogout} />

            <div className="max-w-4xl mx-auto py-8">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {category ? `${category.category} Products` : 'Products'}
                </h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div className="flex justify-between items-center mb-4">
                    <div className="w-1/2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search products"
                            className="border rounded px-4 py-2 w-full"
                        />
                    </div>

                    <div className="flex space-x-5 items-center">
                        <div className="w-40">
                            <label className="mr-2">Sort by:</label>
                            <select value={sort} onChange={handleSortChange} className="border rounded px-2 py-1 w-full">
                                <option value="name,asc">Name (A-Z)</option>
                                <option value="name,desc">Name (Z-A)</option>
                                <option value="mrp,asc">Price (Low to High)</option>
                                <option value="mrp,desc">Price (High to Low)</option>
                                <option value="discount,asc">Discount (Low to High)</option>
                                <option value="discount,desc">Discount (High to Low)</option>
                                <option value="quantity,asc">Quantity (Low to High)</option>
                                <option value="quantity,desc">Quantity (High to Low)</option>
                            </select>
                        </div>

                        
                        <div className="relative">
                            <button
                                onClick={toggleFilterDropdown}
                                className={`border rounded px-4 py-2 ${filterEnabled ? 'bg-green-500 text-white' : 'bg-blue-300'}`}
                            >
                                Filter Options
                            </button>
                            {filterDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                    <div className="p-2">
                                        <label className="block mb-1">Filter by:</label>
                                        <select name="filterType" value={filterType} onChange={handleFilterChange} className="border rounded px-2 py-1 w-full">
                                            <option value="price">Price</option>
                                            <option value="discount">Discount</option>
                                            <option value="quantity">Quantity</option>
                                        </select>
                                    </div>
                                    <div className="p-2">
                                        <label className="block mb-1">Max Value:</label>
                                        <input
                                            type="number"
                                            name="filterValue"
                                            value={filterValue}
                                            onChange={handleFilterChange}
                                            className="border rounded px-2 py-1 w-full"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <button
                                            onClick={handleToggleFilter}
                                            className={`w-full px-4 py-2 rounded ${filterEnabled ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                                        >
                                            {filterEnabled ? 'Disable Filter' : 'Enable Filter'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map(product => (
                            <div key={product.id} className="border rounded shadow p-4">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-700">{product.description}</p> 
                                <p className="text-gray-600">Price: Rs. {product.mrp.toFixed(2)}</p>
                                <p className="text-gray-600">Discount: {product.discount}%</p>
                                <p className="text-gray-600">Quantity: {product.quantity}</p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No products found
                        </div>
                    )}
                </div>

           
                <div className="flex justify-center items-center mt-4">
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={currentPage + 1}
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

export default Products;
