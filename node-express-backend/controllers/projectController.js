const Project = require("../models/Projects");

exports.getProjects = async (req, res) => {
  try {
    const allProjects = await Project.find();
    res.status(200).json(allProjects);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addProjects = (req, res) => {
  try {
    const { project_name, project_description } = req.body;

    // Basic validation (optional)
    if (!project_name || !project_description) {
      return res.status(400).json({ error: "Project details incomplete" });
    }
    const allowedFields = {
      project_name,
      project_description,
    };
    Project.create(allowedFields);
    res.status(200).json({ message: "success", response: req.body });
  } catch (error) {}
};
exports.removeProject = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const result = await Project.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting Project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
