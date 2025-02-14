import React, { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects().then((response) => setProjects(response.data));
  }, []);

  return (
    <div>
      <h2 className="text-center">Projects</h2>
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

export default ProjectList;
