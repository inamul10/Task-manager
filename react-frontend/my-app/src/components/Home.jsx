import React, { useState, useEffect } from "react";
import SideMenu from "./SideMenu";
import TaskModal from "./TaskModal";
import Projects from "./Projects";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [fetchTask, setFetchtask] = useState();
  const [taskText, setTaskText] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to do");
  const [project, setProject] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // New state for modal
  const [showTask, setShowTask] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/project/get");
        const data = await response.json();
        setProjectList(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/task/get");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchProjects();
    fetchTasks();
  }, [fetchTask]);

  const handleAddTask = async () => {
    if (taskText.trim() === "") return;

    const newTask = {
      task_name: taskText,
      task_description: description,
      task_status: status,
      project: project,
    };

    try {
      const response = await fetch("http://localhost:5005/api/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();
      setTasks((prev) => [data, ...prev]);
      setTaskText("");
      setDescription("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-6 transition-all duration-300 flex-shrink-0">
        <SideMenu onMenuSelect={(item) => setShowTask(item === "Tasks")} />
      </div>

      {showTask && (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">📝 Task Planner</h1>

          <div className="flex justify-center mb-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTask();
              }}
              className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4 text-center">
                Add New Task
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="taskText"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Task
                </label>
                <input
                  type="text"
                  id="taskText"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="taskDescription"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Task Description
                </label>
                <input
                  type="text"
                  id="taskDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="project"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Project
                </label>
                <select
                  id="project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                >
                  {projectList.map((proj) => (
                    <option key={proj._id} value={proj._id}>
                      {proj.project_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="taskStatus"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Task Status
                </label>
                <select
                  id="taskStatus"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="to do">To Do</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="bg-gray-200 w-full h-0.5 mt-5 rounded-md"></div>

          <div className="mt-5 flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold">Tasks</h2>

            {tasks.map((task) => (
              <div
                key={task._id}
                onClick={() => setSelectedTask(task)}
                className="w-50 bg-neutral-200 p-3 rounded-md cursor-pointer hover:bg-neutral-300 transition"
              >
                <div className="font-medium flex flex-row justify-between">
                  {task.task_name}{" "}
                  <span className="">{task.task_status.toUpperCase()}</span>
                </div>
              </div>
            ))}

            <TaskModal
              task={selectedTask}
              onClose={() => {
                setSelectedTask(null);
                setFetchtask(true);
              }}
            />
          </div>
        </div>
      )}
      {!showTask && (
        <Projects className="flex-1 overflow-y-auto p-6 bg-gray-100"/>
      )}
    </div>
  );
}

export default Home;
