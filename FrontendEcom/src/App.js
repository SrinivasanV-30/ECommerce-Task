import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Categories from './components/Categories/Categories';
import Products from './components/Product/Products';
import AllProducts from './components/Product/AllProducts';
function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/register" element={<Signup />} />
                    <Route path="/" element={<Login />} /> 
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/category/:id" element={<Products />} />  
                    <Route path="/all-products" element={<AllProducts/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
