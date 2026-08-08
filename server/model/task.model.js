import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["video", "article", "documentation", "other"],
      default: "article",
    },
    duration: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    track: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    difficulty_level: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    requirements: {
      type: [String],
      default: [],
    },
    acceptanceCriteria: {
      type: [String],
      default: [],
    },
    resources: {
      type: [resourceSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;
