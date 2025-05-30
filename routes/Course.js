// Import the required modules
const express = require("express");
const router = express.Router();

// Multer config — assuming this is exported from a separate file
const upload = require('../middlewares/Multer'); // update the path if needed

// Import controllers
const {
  createCourse,
  additionalInformaction,
  getAdditionalInformaction,
  courseIntroVideo,
  getCourseIntroVideo,
  getAllCourses,
  courseDelete
} = require("../controllers/Course");

// Route for creating a course with image upload
router.post("/createCourse", upload.single("file"), createCourse);
router.post("/courseIntroVideo", courseIntroVideo);
router.get("/getCourse", getAllCourses);
router.delete('/delete/:id', courseDelete);


router.post("/additionalInformaction", additionalInformaction);
router.get("/getAdditionalInformaction", getAdditionalInformaction);
router.get("/getCourseIntroVideo", getCourseIntroVideo);

// Export the router
module.exports = router;
