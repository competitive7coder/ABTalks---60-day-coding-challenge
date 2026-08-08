import challengeModel from "../model/challenge.model.js";
import userModel from "../model/user.model.js";

export const getDashboardController = async (req, res) => {
    try {
        const userId = req.userId;

        // Get user
        const user = await userModel.findById(userId).select("-password -refresh_token");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Get active challenge
        const challenge = await challengeModel.findOne({
            userId,
            completed: false,
        });

        // If user doesn't have an active challenge
        if (!challenge) {
            return res.status(200).json({
                success: true,
                message: "No active challenge",
                dashboard: {
                    user,
                    challenge: null,
                    streak: {
                        current: user.current_streak,
                        longest: user.longest_streak,
                    },
                },
            });
        }

        // Get completed submissions
        const completedDays = challenge.completed ? challenge.total_day : challenge.current_day - 1;

        // Get today's task
        const currentTask = challenge.roadmap.find(
            (item) => item.day === challenge.current_day
        );

        return res.status(200).json({
            success: true,
            dashboard: {
                user: {
                    name: user.name,
                    avatar: user.avatar,
                    about_me: user.about_me,
                    github: user.github,
                    linkedin: user.linkedin,
                },

                streak: {
                    current: user.current_streak,
                    longest: user.longest_streak,
                },

                challenge: {
                    id: challenge._id,
                    name: challenge.challenge_name,
                    current_day: challenge.current_day,
                    total_day: challenge.total_day,
                    completed_days: completedDays,
                    completed: challenge.completed,
                    today_task: currentTask || null,
                },
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};