import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },

    day: {
      type: Number,
      required: true,
    },

    github_repo: {
      type: String,
      required: true,
      trim: true,
    },

    github_commit: {
      type: String,
      required: true,
      trim: true,
    },

    linkedin_post: {
      type: String,
      required: true,
      trim: true,
    },

    deployment_url: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

submissionSchema.index(
  {
    userId: 1,
    challengeId: 1,
    day: 1,
  },
  {
    unique: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;