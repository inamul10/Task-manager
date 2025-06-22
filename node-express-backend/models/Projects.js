const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: [true, "Name is required"],
    },
    project_description: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Projects", ProjectSchema);
