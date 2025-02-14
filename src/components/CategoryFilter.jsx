import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/api";

const CategoryFilter = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((response) => setCategories(response.data));
  }, []);

  return (
    <div>
      <label>Filter by Category: </label>
      <select onChange={(e) => onSelectCategory(e.target.value)}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
