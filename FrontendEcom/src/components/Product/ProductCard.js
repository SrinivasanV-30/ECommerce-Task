import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                <p className="text-gray-700"><strong>Category:</strong> {product.category.category|| product.category}</p>
                <p className="text-gray-700"><strong>Description:</strong> {product.description}</p>
                <p className="text-gray-700"><strong>Price:</strong> Rs. {product.mrp.toFixed(2)}</p>
                <p className="text-gray-700"><strong>Discount:</strong> {product.discount}%</p>
                <p className="text-gray-700"><strong>Quantity:</strong> {product.quantity}</p>
            </div>
        </div>
    );
};

export default ProductCard;
