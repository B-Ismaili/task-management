import React, { useEffect, useState } from "react";
import { fetchTasks, markTaskComplete } from "../services/api";

const TaskList = ({ categoryFilter }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(categoryFilter ? { category_id: categoryFilter } : {}).then(
      (response) => setTasks(response.data)
    );
  }, [categoryFilter]);

  const completeTask = (id) => {
    markTaskComplete(id).then(() => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: "completed" } : task
        )
      );
    });
  };

  return (
    <div>
      <h2 className="text-center">Tasks</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className={task.status === "completed" ? "table-success" : ""}
            >
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>
                {task.status === "pending" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => completeTask(task.id)}
                  >
                    Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
