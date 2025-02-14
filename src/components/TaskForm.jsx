import React, { useState, useEffect } from "react";
import { fetchProjects, fetchCategories, createTask } from "../services/api";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [dueDate, setDueDate] = useState(""); // Track due_date
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProjects().then((response) => setProjects(response.data));
    fetchCategories().then((response) => setCategories(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !projectId || !categoryId || !dueDate) return;

    createTask({
      title,
      project_id: projectId,
      category_id: categoryId,
      due_date: dueDate, // Ensure due_date is sent
      status: "pending",
    }).then(() => {
      setTitle("");
      setDueDate("");
      onTaskCreated(); // Refresh task list
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-center">Create Task</h2>

      <div className="mb-3">
        <label className="form-label">Task Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Project</label>
        <select
          className="form-select"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
