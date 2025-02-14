import React, { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Tasks = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm onTaskCreated={() => setRefresh(!refresh)} />
      <TaskList key={refresh} />
    </div>
  );
};

export default Tasks;
