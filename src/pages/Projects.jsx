import React, { useEffect, useState } from "react";
import { fetchProjects, createProject } from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Fetch projects when the component loads
  useEffect(() => {
    fetchProjects().then((response) => setProjects(response.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const response = await createProject({
        name,
        description,
        due_date: dueDate,
      });

      // Update the state with the newly created project
      setProjects((prevProjects) => [...prevProjects, response.data]);

      // Clear input fields after adding project
      setName("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Manage Projects</h1>

      {/* Form to Create a New Project */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create Project
        </button>
      </form>

      {/* Project List */}
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-4">
            <div className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">
                  {project.description || "No description"}
                </p>
                <p className="text-muted">
                  Due: {project.due_date || "No deadline"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
