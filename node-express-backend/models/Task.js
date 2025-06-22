const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task_name: {
      type: String,
      required: [true, "Name is required"],
    },
    task_description: {
      type: String,
    },
    task_status: {
      type: String,
      enum: ["to do", "in progress", "done"],
      default: "to do",
    },
    task_type: {
      type: String,
      enum: ["bug", "change request", "task", "story"],
      default: "task",
    },
    project_id: {
      type: mongoose.Schema.ObjectId,
      ref:'Projects'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
