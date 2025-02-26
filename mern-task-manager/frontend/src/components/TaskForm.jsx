import { useState } from 'react';

function TaskForm({ onAdd }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending' // Default status
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            onAdd(data);
            setFormData({ title: '', description: '', status: 'pending' }); // Reset form
        })
        .catch(err => console.error("Task submission error:", err));
    }

    return ( 
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Add Task</h2>
            
            <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Task Title"
                required
                className="w-full p-2 mb-3 border rounded"
            />
            
            <input 
                type="text" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Task Description"
                required
                className="w-full p-2 mb-3 border rounded"
            />
            
            <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                className="w-full p-2 mb-3 border rounded"
            >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;
