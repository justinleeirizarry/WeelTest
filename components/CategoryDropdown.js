import React from 'react';

const CategoryDropdown = ({ categories, selectedCategory, onCategoryChange }) => (
    <select
        value={selectedCategory}
        onChange={onCategoryChange}
        style={{ padding: '5px' }}
    >
        {categories.map(category => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ))}
    </select>
);

export default CategoryDropdown;