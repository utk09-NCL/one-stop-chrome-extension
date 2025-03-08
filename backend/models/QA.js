const mongoose = require("mongoose");

const QASchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  question: { type: String, required: true },
  answer: String,
  url: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QA", QASchema);
