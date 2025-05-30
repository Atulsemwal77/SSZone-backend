const Course = require('../Models/Course');
const AdditionalInformaction = require('../Models/additionalInformaction');
const path = require('path');
const fs = require('fs');
const CourseIntroVideo = require('../Models/CourseIntroVideo')


// exports.createCourse = async (req, res) => {
//   try {
//     const {
//       courseTitle,
//       courseSlug,
//       aboutCourse,
//       regularPrice,
//       discountPrice,
//       courseCategories,
//     } = req.body;

//     console.log(
//       courseTitle,
//       courseSlug,
//       aboutCourse,
//       regularPrice,
//       discountPrice,
//       courseCategories,
//     );

//     // Access uploaded file
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({
//         success: false,
//         message: "Course thumbnail image is required."
//       });
//     }

//     // Build full image path
//     const courseThumbnial = `uploads/${file.filename}`;


//     const course = await Course.create({
//       courseTitle,
//       courseSlug,
//       aboutCourse,
//       regularPrice,
//       discountPrice,
//       courseCategories,
//       courseThumbnial
//     });

//     return res.status(200).json({
//       success: true,
//       course,
//       message: "Course Created Successfully"
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.createCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      courseSlug,
      aboutCourse,
      regularPrice,
      discountPrice,
      courseCategories,
    } = req.body;

    // File check
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Course thumbnail image is required."
      });
    }

    const courseThumbnail = `uploads/${file.filename}`;


    // If courseCategories comes as a comma-separated string, convert to array:
    let categories = courseCategories;
    if (typeof courseCategories === 'string') {
      categories = courseCategories.split(',').map(cat => cat.trim());
    }

    const course = await Course.create({
      courseTitle,
      courseSlug,
      aboutCourse,
      regularPrice: Number(regularPrice),
      discountPrice: Number(discountPrice),
      courseCategories: categories,
      courseThumbnail,
    });

    return res.status(200).json({
      success: true,
      course,
      message: "Course Created Successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {


  try {
    const courses = await Course.find();
    return res.status(200).json({
      success: true,
      courses,
      message: "All courses fetched successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.courseDelete = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the course by ID
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Delete thumbnail image file from uploads folder if exists
    if (course.courseThumbnail) {
      const filePath = path.join(__dirname, '..', course.courseThumbnail);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting thumbnail file:", err);
          // We continue even if file deletion fails
        }
      });
    }

    // Delete course from DB
    await Course.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.courseIntroVideo = async (req, res) => {
  try {
    const videoUrl = req.body.videoUrl;
    console.log(videoUrl);

    if (!videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    const video = await CourseIntroVideo.create({ videoUrl });

    return res.status(201).json({
      success: true,
      message: "Video URL uploaded successfully",
      data: video,
    });

  } catch (error) {
    console.error("Error uploading course intro video:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getCourseIntroVideo = async (req, res) => {
  try {

    const response = await CourseIntroVideo.find();

    return res.status(200).json({
      success: true,
      message: "Videos Fetch successfully",
      response,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.additionalInformaction = async (req, res) => {
  try {
    const {
      language,
      startDate,
      requirements,
      description,
      hour,
      minute,
      courseTag
    } = req.body;

    console.log(
      language,
      startDate,
      requirements,
      description,
      hour,
      minute,
      courseTag
    );

    const course = await AdditionalInformaction.create({
      language,
      startDate,
      requirements,
      description,
      hour,
      minute,
      courseTag
    });

    return res.status(200).json({
      success: true,
      course,
      message: "Course Created Successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAdditionalInformaction = async (req, res) => {
  try {

    const response = await AdditionalInformaction.find()

    return res.status(200).json({
      success: true,
      response,
      message: "All AdditionalInformaction Fetch Successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



