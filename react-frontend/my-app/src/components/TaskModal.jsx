import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function TaskModal({ task, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    _id: "",
    task_name: "",
    task_description: "",
    task_status: "",
  });

  // Sync formData with task prop when modal opens
  useEffect(() => {
    if (task) {
      setFormData({
        _id : task._id,
        task_name: task.task_name,
        task_description: task.task_description,
        task_status: task.task_status,
      });
      console.log("Task loaded into modal >>", task.task_name);
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5005/api/task/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");
      const updated = await response.json();
      onUpdate?.(updated); // call parent handler if passed
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!task) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Task Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Task Name</label>
            <input
              type="text"
              name="task_name"
              value={formData.task_name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="task_description"
              value={formData.task_description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Status</label>
            <select
              name="task_status"
              value={formData.task_status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="to do">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default TaskModal;
