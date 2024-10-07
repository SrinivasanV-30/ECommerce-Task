import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ category }) => {
    const navigate = useNavigate();

    const handleCategoryClick = () => {
        
        navigate(`/category/${category.id}`);
    };

    return (
        <tr onClick={handleCategoryClick} className="cursor-pointer hover:bg-gray-100 transition">
            <td className="py-2 px-4 border-b">{category.id}</td>
            <td className="py-2 px-4 border-b">{category.category || 'Unknown'}</td>
            <td className="py-2 px-4 border-b">{new Date(category.creationDate).toLocaleDateString()}</td>
        </tr>
    );
};

export default CategoryItem;
