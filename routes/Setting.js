// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const { setting, getSetting } = require("../controllers/Setting")


// Route for user setting
router.post("/setting", setting);
router.get("/getSetting", getSetting);

// Export the router for use in the main application
module.exports = router