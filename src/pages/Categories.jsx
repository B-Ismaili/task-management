import React, { useEffect, useState } from "react";
import { fetchCategories, createCategory } from "../services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories().then((response) => setCategories(response.data));
  }, []);

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    createCategory({ name: newCategory }).then((response) => {
      setCategories([...categories, response.data]);
      setNewCategory(""); // Clear input after creation
    });
  };

  return (
    <div>
      <h1 className="text-center mb-4">Manage Categories</h1>

      {/* Form to Add a New Category */}
      <form onSubmit={handleCategorySubmit} className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="New Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success">
          Add Category
        </button>
      </form>

      {/* Category List */}
      <ul className="list-group">
        {categories.map((category) => (
          <li key={category.id} className="list-group-item">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
