import mongoose from "mongoose";

const answerResultSchema = new mongoose.Schema(
  {
    questionId: {
      type: Number,
      required: true
    },
    statementNumber: {
      type: Number,
      required: true
    },
    prompt: {
      type: String,
      required: true,
      trim: true
    },
    submittedAnswer: {
      type: String,
      required: true,
      trim: true
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  },
  {
    _id: false
  }
);

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    answers: {
      type: [String],
      required: true
    },
    results: {
      type: [answerResultSchema],
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Submission", submissionSchema);
