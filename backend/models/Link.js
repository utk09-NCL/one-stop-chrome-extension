const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  title: { type: String, required: true },
  url: { type: String, required: true },
  notes: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Link", LinkSchema);
