import challengeModel from "../model/challenge.model.js";
import taskModel from "../model/task.model.js";

import { backendChallenge, frontendChallenge, fullStackChallenge } from "../util/data.js";

export const createChallenge = async (req, res) => {
    try {
        const { track } = req.body || {};

        const userId = req.userId;

        // Check whether user already has a challenge
        const existingChallenge = await challengeModel.findOne({ userId: userId })

        if (existingChallenge) {
            return res.status(400).json({
                success: false,
                message: "You already have a challenge",
            });
        }

        let challengeData;

        if (track === "Backend") {
            challengeData = backendChallenge;
        } else if (track === "Frontend") {
            challengeData = frontendChallenge;
        } else if (track === "Full Stack") {
            challengeData = fullStackChallenge;
        } else {
            // Support for dynamic custom tracks (e.g. AI/ML, DSA, Mobile)
            challengeData = {
                challenge_name: track,
                total_day: 60,
                description: `A customized ${track} 60-day challenge roadmap.`,
                roadmap: Array.from({ length: 60 }, (_, i) => ({
                    day: i + 1,
                    task: "Pending Curriculum",
                    description: `The admin has not added the task for Day ${i + 1} yet.`,
                    difficulty_level: "Medium"
                }))
            };
        }

        const challenge = await challengeModel.create({
            userId,
            ...challengeData,
        });

        return res.status(201).json({
            success: true,
            message: "Challenge created successfully",
            challenge,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const getCurrentChallenge = async (req, res) => {
    try {
        const userId = req.userId;

        const challenge = await challengeModel.findOne(
            {
                userId: userId,
                completed: { $ne: true }
            }
        )

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found",
            });
        }

        let currentTask = challenge.roadmap.find(
            (item) => item.day === challenge.current_day
        );

        if (!currentTask) {
            return res.status(404).json({
                success: false,
                message: "Current day task not found",
            });
        }

        // Live override: If an admin updated the task, fetch the latest version
        let liveTask = await taskModel.findOne({ day: challenge.current_day, track: challenge.challenge_name });
        if (!liveTask) liveTask = await taskModel.findOne({ day: challenge.current_day, track: { $exists: false } }); // Fallback to general task
        if (!liveTask) liveTask = await taskModel.findOne({ day: challenge.current_day }); // Catch-all fallback

        if (liveTask) {
            currentTask = {
                day: currentTask.day,
                task: liveTask.task,
                description: liveTask.description,
                difficulty_level: liveTask.difficulty_level,
                requirements: liveTask.requirements,
                acceptanceCriteria: liveTask.acceptanceCriteria,
                resources: liveTask.resources
            };
        }

        return res.status(200).json({
            success: true,
            challenge: {
                id: challenge._id,
                challenge_name: challenge.challenge_name,
                total_day: challenge.total_day,
                current_day: challenge.current_day,
                task: currentTask,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const getChallengeByDay = async (req, res) => {
    try {
        const userId = req.userId;
        const day = Number(req.params.day);

        if (!day || day < 1 || day > 60) {
            return res.status(400).json({
                success: false,
                message: "Invalid challenge day",
            });
        }

        const challenge = await challengeModel.findOne({ userId });

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found",
            });
        }

        let task = challenge.roadmap.find(
            (item) => item.day === day
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // Live override: If an admin updated the task, fetch the latest version
        let liveTask = await taskModel.findOne({ day: day, track: challenge.challenge_name });
        if (!liveTask) liveTask = await taskModel.findOne({ day: day, track: { $exists: false } });
        if (!liveTask) liveTask = await taskModel.findOne({ day: day });

        if (liveTask) {
            task = {
                day: task.day,
                task: liveTask.task,
                description: liveTask.description,
                difficulty_level: liveTask.difficulty_level,
                requirements: liveTask.requirements,
                acceptanceCriteria: liveTask.acceptanceCriteria,
                resources: liveTask.resources
            };
        }

        return res.status(200).json({
            success: true,
            challenge: {
                id: challenge._id,
                challenge_name: challenge.challenge_name,
                total_day: challenge.total_day,
                current_day: challenge.current_day,
                completed: challenge.completed,
                task,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


