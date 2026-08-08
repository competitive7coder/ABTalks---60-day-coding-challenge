import submissionModel from "../model/submisson.model.js";
import challengeModel from "../model/challenge.model.js";
import userModel from "../model/user.model.js";

export const submitChallenge = async (req, res) => {
    try {
        const userId = req.userId;
        const { day, github_repo, github_commit, linkedin_post, deployment_url } = req.body || {};

        if (!day || !github_repo || !github_commit || !linkedin_post) {
            return res.status(400).json({
                success: false,
                message: "Please provide day, github_repo, github_commit and linkedin_post",
            });
        }

        // Link Detector / Domain Verification
        if (!github_repo.toLowerCase().includes("github.com")) {
            return res.status(400).json({
                success: false,
                message: "Invalid GitHub URL. Must contain 'github.com'."
            });
        }

        if (!linkedin_post.toLowerCase().includes("linkedin.com")) {
            return res.status(400).json({
                success: false,
                message: "Invalid LinkedIn URL. Must contain 'linkedin.com'."
            });
        }

        // Find user's active challenge
        const challenge = await challengeModel.findOne({ userId });
        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "No active challenge found for this user. Please start a track first.",
            });
        }

        // STEP 1: Enforce time-based locking (max 1 task per 24 hours with a 2-hour grace window = 22 hours)
        const currentUser = await userModel.findById(userId);
        if (currentUser && currentUser.lastSubmissionTime) {
            const lastSubTime = new Date(currentUser.lastSubmissionTime).getTime();
            const timeDiffMs = Date.now() - lastSubTime;
            const hoursSinceLastSub = timeDiffMs / (1000 * 60 * 60);
            console.log("HOURS SINCE LAST SUB (FROM USER):", hoursSinceLastSub);
            if (hoursSinceLastSub < 22) {
                const hoursLeft = Math.ceil(22 - hoursSinceLastSub);
                return res.status(429).json({
                    success: false,
                    message: `Next challenge day unlocks in ${hoursLeft} hour(s). Keep building and check back then!`
                });
            }
        }

        // Check if this exact repository commit or linkedin link was already submitted on another day
        const duplicateLink = await submissionModel.findOne({
            userId,
            $or: [
                {
                    $and: [
                        { github_repo: github_repo },
                        { github_commit: github_commit }
                    ]
                },
                { linkedin_post: linkedin_post }
            ]
        });

        if (duplicateLink) {
            return res.status(400).json({
                success: false,
                message: "You have already submitted this GitHub commit or LinkedIn post for another day. Submissions must be unique."
            });
        }

        // Check if submission already exists for this day
        const existingSubmission = await submissionModel.findOne({
            userId,
            challengeId: challenge._id,
            day,
        });

        if (existingSubmission) {
            return res.status(400).json({
                success: false,
                message: `You have already submitted your work for Day ${day}`,
            });
        }

        // Create new submission
        const submission = await submissionModel.create({
            userId,
            challengeId: challenge._id,
            day,
            github_repo,
            github_commit,
            linkedin_post,
            deployment_url: deployment_url || "",
        });

        // Update User streak stats and lastSubmissionTime
        const user = await userModel.findById(userId);
        if (user) {
            user.lastSubmissionTime = new Date();
            // Increment current streak if submitting the active day
            if (day === challenge.current_day) {
                user.current_streak += 1;
                if (user.current_streak > user.longest_streak) {
                    user.longest_streak = user.current_streak;
                }
            }
            await user.save();

            // Increment challenge day
            if (day === challenge.current_day && challenge.current_day < 60) {
                challenge.current_day += 1;
                await challenge.save();
            }
        }

        return res.status(201).json({
            success: true,
            message: `Day ${day} submitted successfully!`,
            submission,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server error while creating submission",
        });
    }
};

export const getUserSubmissions = async (req, res) => {
    try {
        const userId = req.userId;
        const submissions = await submissionModel.find({ userId });
        return res.status(200).json({
            success: true,
            submissions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server error while fetching submissions",
        });
    }
};

export const createSubmission = submitChallenge;
