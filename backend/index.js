const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const linkRoutes = require("./routes/linkRoutes");
const qaRoutes = require("./routes/qaRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error during MongoDB connection", err));

app.use("/api/projects", projectRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/qas", qaRoutes);

app.get("/", (req, res) => {
  res.send("OneStop Backend running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
