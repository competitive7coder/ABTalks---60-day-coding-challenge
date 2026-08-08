import challengeModel from "../model/challenge.model.js";
import submissionModel from "../model/submisson.model.js";
import userModel from "../model/user.model.js";

export const getDashboardController = async (req, res) => {
    try {
        const userId = req.userId;

        const [user, challenge, lastSubmission] = await Promise.all([
            userModel.findById(userId).select("-password -refresh_token"),
            challengeModel.findOne({
                userId,
                completed: false,
            }),
            submissionModel.findOne({ userId }).sort({ createdAt: -1 })
        ])

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (lastSubmission) {
            const lastDate = new Date(lastSubmission.createdAt);
            const today = new Date();

            lastDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            const differenceInDays =
                (today - lastDate) / (1000 * 60 * 60 * 24);

            if (differenceInDays > 1 && user.current_streak !== 0) {
                user.current_streak = 0;
                await user.save();
            }
        }

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