import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    type: String,
    duration: String,
  },
  { _id: false }
);

const dailyTaskSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
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
    _id: false,
  }
);

const challengeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challenge_name: {
      type: String,
      required: true,
    },
    total_day: {
      type: Number,
      default: 60,
    },
    current_day: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false
    },
    roadmap: {
      type: [dailyTaskSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const challengeModel = mongoose.model("Challenge", challengeSchema);

export default challengeModel;