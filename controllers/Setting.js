const Setting = require('../Models/Setting');

exports.setting = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {
      firstName,
      lastName,
      userName,
      phoneNumber,
      skill,
      displayNamePubliclyAs,
      bio
    } = req.body;

    console.log(
      firstName,
      lastName,
      userName,
      phoneNumber,
      skill,
      displayNamePubliclyAs,
      bio
    );


    const user = await Setting.create({
      firstName,
      lastName,
      userName,
      phoneNumber,
      skill,
      displayNamePubliclyAs,
      bio,
    })

    return res.status(200).json({
      success: true,
      user,
      message: "Setting Update Successfully"
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Update Setting, Please try again.",
    });
  }
}

exports.getSetting = async (req, res) => {
  try {    
    const { userId } = req.body;
    
    const userSetting = await Setting.findOne({ _id: userId });

    if (!userSetting) {
      return res.status(404).json({
        success: false,
        message: "Setting not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: userSetting,
      message: "Setting retrieved successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve setting, please try again.",
    });
  }
};
