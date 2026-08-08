import userModel from '../model/user.model.js';

const admin = async (request, response, next) => {
  try {
    const userId = request.userId;
    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized - No user ID",
        error: true,
        success: false
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    if (user.role !== 'admin') {
      return response.status(403).json({
        message: "Forbidden - Admin access only",
        error: true,
        success: false
      });
    }

    request.currentUser = user;
    next();
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export default admin;
