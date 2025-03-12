const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const session = require("express-session");
const passport = require("./config/passport");

const projectRoutes = require("./routes/projectRoutes");
const linkRoutes = require("./routes/linkRoutes");
const qaRoutes = require("./routes/qaRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error during MongoDB connection", err));

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/projects", projectRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/qas", qaRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("OneStop Backend running...");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
