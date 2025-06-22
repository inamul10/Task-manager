const Task = require("../models/Task");

getTasks = async (req, res) => {
  try {
    const allTasks = await Task.find();
    const { id } = req.query;
    console.log(id);

    if (id) {
      const fltrdTask = allTasks.filter((task) => {
        return task.project_id == id;
      });
      res.status(200).json(fltrdTask);
    } else {
      res.status(200).json(allTasks);
    }
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
addTask = async (req, res) => {
  try {
    const { task_name, task_description, task_status, task_type, project_id } =
      req.body;

    // Basic validation (optional)
    if (!task_name || !task_description) {
      return res.status(400).json({ error: "Task details incomplete" });
    }
    const allowedFields = {
      task_name,
      task_description,
      task_status,
      task_type,
      project_id,
    };
    await Task.create(allowedFields);
    res.status(200).json({ message: "success", response: req.body });
  } catch (error) {}
};
removeTask = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const result = await Task.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

editTask = async (req, res) => {
  try {
    const { task_name, _id, task_description, task_status } = req.body;
    const result = await Task.updateOne(
      { _id },
      {
        $set: {
          task_name,
          task_status,
          task_description,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({
          message: "No task was updated. Task not found or data unchanged.",
        });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTasks,
  removeTask,
  addTask,
  editTask,
};
