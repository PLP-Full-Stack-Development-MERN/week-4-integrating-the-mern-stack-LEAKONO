import React from 'react';

function TaskList({ tasks, onDelete, onUpdateStatus }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No tasks available.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Task List</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-blue-600 font-medium">Status: {task.status}</p>

            <div className="mt-3 flex gap-2">
              {/* Update Status */}
              <button 
                onClick={() => onUpdateStatus(task._id, 'Completed')}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Mark as Completed
              </button>

              {/* Delete Task */}
              <button 
                onClick={() => onDelete(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
