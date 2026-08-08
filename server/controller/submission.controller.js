import challengeModel from "../model/challenge.model.js";
import submissionModel from "../model/submisson.model.js";
import userModel from "../model/user.model.js";

export const createSubmission = async (req, res) => {
    try {
        const {
            challengeId,
            day,
            github_repo,
            github_commit,
            linkedin_post,
            deployment_url,
        } = req.body || {};

        const userId = req.userId;

        // Check required fields
        if (
            !challengeId ||
            !day ||
            !github_repo ||
            !github_commit ||
            !linkedin_post
        ) {
            return res.status(400).json({
                success: false,
                message: "All submission fields are required",
            });
        }

        // Check challenge belongs to logged-in user
        const challenge = await challengeModel.findOne({
            _id: challengeId,
            userId,
        });

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found",
            });
        }

        // Check valid day
        const challengeDay = challenge.roadmap.find(
            (item) => item.day === Number(day)
        );

        if (Number(day) > challenge.current_day) {
            return res.status(400).json({
                success: false,
                message: `You must complete Day ${challenge.current_day} first`,
            });
        }

        if (!challengeDay) {
            return res.status(400).json({
                success: false,
                message: "Invalid challenge day",
            });
        }

        // Create submission
        const submission = await submissionModel.create({
            userId,
            challengeId,
            day: Number(day),
            github_repo,
            github_commit,
            linkedin_post,
            deployment_url,
        });

        if (challenge.current_day === challenge.total_day) {
            challenge.completed = true;
        } else {
            challenge.current_day += 1;
        }

        const user = await userModel.findById(userId)

        if (user) {
            user.current_streak += 1

            if (user.current_streak > user.longest_streak) {
                user.longest_streak = user.current_streak
            }

            await Promise.all([
                user.save(),
                challenge.save()
            ])
        }
        else {
            await challenge.save()
        }

        return res.status(201).json({
            success: true,
            message: "Submission created successfully",
            submission,
        });
    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "You have already submitted this day",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};