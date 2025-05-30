const express = require("express");
const app = express();

// Routes
const setting = require("./routes/Setting");
const course = require("./routes/Course");
const modules = require("./routes/Module");
const lesson = require("./routes/Lesson");
const quiz = require("./routes/Quiz");
const assignment = require("./routes/assignment");
const announcement_route = require("./routes/announcementRoute");

app.use("/uploads", express.static("uploads"));

require("dotenv").config();
const cookieParser = require("cookie-parser");
const database = require("./config/database");

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 4000;

// DataBase Connect
database.connect();

// Middlerwares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes Mounts
app.use("/api/setting", setting);
app.use("/api/course", course);
app.use("/api/modules", modules);
app.use("/api/lesson", lesson);
app.use("/api/quiz", quiz);
app.use("/api/assignment", assignment);
app.use("/api/ancument", announcement_route);

// Default Routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server is up and running",
  });
});

// Server Activate
app.listen(PORT, () => {
  console.log(`Your App Is Running At ${PORT}`);
});
