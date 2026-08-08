import mongoose from "mongoose";

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
    }
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
      enum: ["Frontend", "Backend", "Full Stack"],
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