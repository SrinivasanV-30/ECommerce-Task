
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductCard from './ProductCard';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../Navbar/Navbar';

// const AllProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [displayedProducts, setDisplayedProducts] = useState([]);
//     // const [relatedProducts, setRelatedProducts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [pageSize] = useState(10);
//     const [sort, setSort] = useState('name,asc');
//     const [searchQuery, setSearchQuery] = useState('');
//     const navigate = useNavigate();

//     const isAuth = (sessionKey) => {
//         fetch('http://localhost:8080/api/isauth', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ name: sessionKey }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 if (!data.success) {
//                     setError('Session Expired');
//                     navigate('/');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 setError('An error occurred in session auth.');
//                 navigate('/');
//             });
//     };

//     const fetchProducts = async () => {
//         setLoading(true);
//         setError('');

//         try {
//             const response = await axios.get('http://localhost:8080/api/products/all', {
//                 params: {
//                     page: 0,
//                     size: 1000,
//                     sortField: sort.split(',')[0],
//                     sortDir: sort.split(',')[1],
//                 },
//             });

//             setProducts(response.data.data.content);
//             setDisplayedProducts(response.data.data.content);
//             setTotalPages(Math.ceil(response.data.data.content.length / pageSize));
//         } catch (err) {
//             setError('Error fetching products');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const searchProducts = async (query) => {
//         setLoading(true);
//         setError('');
//         if (!query.trim()) {
//             fetchProducts();
//             return;
//         }

//         try {
//             const response = await axios.get('http://localhost:8080/search', {
//                 params: {
//                     search: query,
//                 },
//             });
//             setDisplayedProducts(response.data);
//             setTotalPages(Math.ceil(response.data.length / pageSize));
//             setCurrentPage(0);
//         } catch (err) {
//             setError('Error fetching search results');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const sessionKey = localStorage.getItem('sessionKey');
//         if (sessionKey) {
//             isAuth(sessionKey);
//             fetchProducts();
//         } else {
//             navigate('/'); 
//         }
//     }, [sort]);

//     const handleLogout = () => {
//         localStorage.removeItem('sessionKey');
//         alert('Logout Successful!');
//         navigate('/');
//     };

   
//     const handlePageChange = (event, value) => {
//         setCurrentPage(value - 1);
//     };

   
//     const handleSortChange = (e) => {
//         setSort(e.target.value);
//     };

    
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value); 
//     };

    
//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             searchProducts(searchQuery); 
//         }
//     };

//     if (loading) {
//         return <div className="flex items-center justify-center h-screen"><div className="loader"></div></div>;
//     }

//     const paginatedProducts = displayedProducts.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

//     return (
//         <div>
//             <Navbar onLogout={handleLogout} />
//             <div className="max-w-6xl mx-auto py-8">
//                 <h2 className="text-2xl font-bold text-center mb-4">All Products</h2>

//                 {error && (
//                     <div>
//                         <p className="text-red-500 text-center">{error}</p>
//                         <button onClick={fetchProducts} className="bg-blue-500 text-white rounded px-4 py-2">
//                             Retry
//                         </button>
//                     </div>
//                 )}

//                 <div className="flex justify-between items-center mb-4">
//                     <div className="w-1/2">
//                         <input
//                             type="text"
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                             onKeyPress={handleKeyPress} 
//                             placeholder="Search products (e.g., smartphone under 650,toy under 30)"
//                             className="border rounded px-4 py-2 w-full"
//                         />
//                     </div>

//                     <div className="w-1/4">
//                         <label className="mr-2">Sort by:</label>
//                         <select value={sort} onChange={handleSortChange} className="border rounded px-2 py-1 w-full">
//                             <option value="name,asc">Name (A-Z)</option>
//                             <option value="name,desc">Name (Z-A)</option>
//                             <option value="mrp,asc">Price (Low to High)</option>
//                             <option value="mrp,desc">Price (High to Low)</option>
//                             <option value="discount,asc">Discount (Low to High)</option>
//                             <option value="discount,desc">Discount (High to Low)</option>
//                             <option value="quantity,asc">Quantity (Low to High)</option>
//                             <option value="quantity,desc">Quantity (High to Low)</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                     {paginatedProducts.length > 0 ? (
//                         paginatedProducts.map(product => (
//                             <div key={product.id} className="flex flex-col h-full">
//                                 <ProductCard product={product} />
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-500 col-span-full">No products found</p>
//                     )}
//                 </div>
//                 {/* {relatedProducts.length > 0 && (
//                 <div className="mt-8">
//                     <h3 className="text-xl font-bold">Related Products</h3>
//                     <div className="grid grid-cols-2 gap-6">
//                         {relatedProducts.map(relatedProduct => (
//                             <div key={relatedProduct.id} className="flex flex-col h-full">
//                                 <ProductCard product={relatedProduct} />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 )} */}

//                 <div className="flex justify-center items-center mt-4">
//                     <Stack spacing={2}>
//                         <Pagination
//                             count={totalPages}
//                             page={currentPage + 1}
//                             onChange={handlePageChange}
//                             variant="outlined"
//                             shape="rounded"
//                         />
//                     </Stack>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllProducts;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);
    const [sort, setSort] = useState('name,asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const isAuth = (sessionKey) => {
        fetch('http://localhost:8080/api/isauth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: sessionKey }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.success) {
                    setError('Session Expired');
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('An error occurred in session auth.');
                navigate('/');
            });
    };

    const fetchProducts = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get('http://localhost:8080/api/products/all', {
                params: {
                    page: 0,
                    size: 1000,
                    sortField: sort.split(',')[0],
                    sortDir: sort.split(',')[1],
                },
            });

            setProducts(response.data.data.content);
            setDisplayedProducts(response.data.data.content);
            setTotalPages(Math.ceil(response.data.data.content.length / pageSize));
        } catch (err) {
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async (query) => {
        setIsSearching(true);
        setLoading(true);
        setError('');
        if (!query.trim()) {
            setIsSearching(false);
            fetchProducts();
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/search', {
                params: {
                    search: query,
                },
            });
            setDisplayedProducts(response.data.primaryProducts);
            setRelatedProducts(response.data.similarProducts);
            setTotalPages(Math.ceil(response.data.length / pageSize));
            setCurrentPage(0);
        } catch (err) {
            setError('Error fetching search results');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const sessionKey = localStorage.getItem('sessionKey');
        if (sessionKey) {
            isAuth(sessionKey);
            fetchProducts();
        } else {
            navigate('/');
        }
    }, [sort]);

    const handleLogout = () => {
        localStorage.removeItem('sessionKey');
        alert('Logout Successful!');
        navigate('/');
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchProducts(searchQuery);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><div className="loader"></div></div>;
    }

    const paginatedProducts = displayedProducts.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    return (
        <div>
            <Navbar onLogout={handleLogout} />
            <div className="max-w-6xl mx-auto py-8">
                <h2 className="text-2xl font-bold text-center mb-4">All Products</h2>

                {error && (
                    <div>
                        <p className="text-red-500 text-center">{error}</p>
                        <button onClick={fetchProducts} className="bg-blue-500 text-white rounded px-4 py-2">
                            Retry
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center mb-4">
                    <div className="w-1/2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Search products (e.g., smartphone under 650,toy under 30)"
                            className="border rounded px-4 py-2 w-full"
                        />
                    </div>

                    <div className="w-1/4">
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
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map(product => (
                            <div key={`product-${product.id}`} className="flex flex-col h-full">
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">No products found</p>
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

                
                {isSearching && relatedProducts.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-xl font-bold">Related Products</h3>
                        <div className="grid grid-cols-2 gap-6">
                            {relatedProducts.map(relatedProduct => (
                                <div key={`related-${relatedProduct.id}`} className="flex flex-col h-full">
                                    <ProductCard product={relatedProduct} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
