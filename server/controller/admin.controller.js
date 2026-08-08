import userModel from '../model/user.model.js';
import challengeModel from '../model/challenge.model.js';
import submissionModel from '../model/submisson.model.js';

// Promote a regular user to admin (Requires Admin privileges)
export const upgradeUserRole = async (req, res) => {
    try {
        const { targetEmail } = req.body;

        if (!targetEmail) {
            return res.status(400).json({ message: "Please provide targetEmail", error: true, success: false });
        }

        const targetUser = await userModel.findOne({ email: targetEmail });
        
        if (!targetUser) {
            return res.status(404).json({ message: "User not found", error: true, success: false });
        }

        if (targetUser.role === 'admin') {
            return res.status(400).json({ message: "User is already an admin", error: true, success: false });
        }

        targetUser.role = 'admin';
        await targetUser.save();

        return res.json({
            message: `Successfully upgraded ${targetEmail} to Admin!`,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export const getPlatformStats = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        const totalChallenges = await challengeModel.countDocuments();
        const totalSubmissions = await submissionModel.countDocuments();

        // Get leaderboard (users sorted by highest streak)
        const leaderboard = await userModel.find({}, 'name email current_streak role')
            .sort({ current_streak: -1 })
            .limit(100); // Admin sees top 100

        return res.json({
            error: false,
            success: true,
            stats: {
                totalUsers,
                totalChallenges,
                totalSubmissions
            },
            leaderboard
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
