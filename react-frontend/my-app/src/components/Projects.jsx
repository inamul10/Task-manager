import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Projects = () => {
  const [projectText, setProjectText] = useState("");
  const [projects, setProjects] = useState([]);
  const [getProject, setGetProject] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    const getProjects = async () => {
      const response = await fetch("http://localhost:5005/api/project/get");
      const project = await response.json();
      setProjects(project);
    };
    getProjects();
  }, [getProject]);

  const handleAddTask = async () => {
    if (projectText.trim() === "") return;

    const newProject = {
      project_name: projectText,
      project_description: projectDescription,
    };

    try {
      const response = await fetch("http://localhost:5005/api/project/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      const data = await response.json();
      // setTasks((prev) => [data, ...prev]);
      setProjectText("");
      setProjectDescription("");
      toast.success("Project added successfully!");
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const deleteProject = async (project) => {
    console.log(project);
    const rb = {
      id: project?._id,
    };
    const response = await fetch("http://localhost:5005/api/project/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rb),
    });

    console.log(await response.json());
    toast.success("Project deleted");
    setGetProject(true);
  };
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">📁 Projects</h1>

        <div className="flex justify-center mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
            }}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Add New Project
            </h2>

            <div className="mb-4">
              <label
                htmlFor="projectText"
                className="block text-gray-700 font-semibold mb-1"
              >
                Project
              </label>
              <input
                type="text"
                id="taskText"
                value={projectText}
                onChange={(e) => setProjectText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="projectDescription"
                className="block text-gray-700 font-semibold mb-1"
              >
                Project Description
              </label>
              <input
                type="text"
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="mt-5 flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Project-List</h2>

          {projects.map((project) => (
            <div
              key={project._id}
              className="w-75 bg-neutral-200 p-3 rounded-md cursor-pointe transition"
            >
              <div className="flex flex-row justify-between items-center">
                <div className="font-medium flex flex-col justify-between">
                  {project.project_name}
                  <div className="my-2">
                    <span className="text-sm">
                      {" "}
                      {project.project_description}
                    </span>
                  </div>
                </div>
                <div className="pl-4">
                  <button
                    onClick={() => {
                      deleteProject(project);
                    }}
                    className="bg-gray-400 hover:bg-gray-500 p-2 rounded-md"
                  >
                    Delete 🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div>{projects.length == 0 && <h3>Loading....</h3>}</div>
        </div>
      </div>
    </>
  );
};

export default Projects;
