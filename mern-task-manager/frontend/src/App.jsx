import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import Search from './components/Search';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  // Function to fetch tasks from API
  const fetchTasks = () => {
    fetch("http://localhost:5000/api/tasks")
      .then(res => res.json())
      .then((data) => {
        console.log("Fetched tasks:", data);
        setTasks(data.tasks || []);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setTasks([]);
      });
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to add a new task
  const addTask = (task) => {
    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
    .then(res => res.json())
    .then(() => fetchTasks())  // Re-fetch tasks after adding
    .catch(err => console.error("Add Task error:", err));
  };

  // Function to delete a task
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => fetchTasks())  // Re-fetch tasks after deleting
      .catch(err => console.error("Delete error:", err));
  };

  // Function to update task status
  const updateStatus = (id, newStatus) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(() => fetchTasks())  // Re-fetch tasks after updating
    .catch(err => console.error("Update error:", err));
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Task Manager</h1>

      <div className="flex flex-wrap md:flex-nowrap gap-4">
        
        {/* Left Side - Task Form */}
        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Add Task</h2>
          <TaskForm onAdd={addTask} />
        </div>

        {/* Right Side - Search & Task List */}
        <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md">
          
          {/* Search Input */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Task List</h2>
            <Search search={search} setSearch={setSearch} />
          </div>

          {/* Task List */}
          <TaskList tasks={filteredTasks} onDelete={deleteTask} onUpdateStatus={updateStatus} />
        </div>
      </div>
    </div>
  );
}

export default App;
