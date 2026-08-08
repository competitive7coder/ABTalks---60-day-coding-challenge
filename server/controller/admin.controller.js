import userModel from '../model/user.model.js';

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
