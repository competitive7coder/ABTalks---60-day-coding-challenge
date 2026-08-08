import challengeModel from "../model/challenge.model.js";

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
            return res.status(400).json({
                success: false,
                message: "Invalid track",
            });
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
                completed: false
            }
        )

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found",
            });
        }

        const currentTask = challenge.roadmap.find(
            (item) => item.day === challenge.current_day
        );

        if (!currentTask) {
            return res.status(404).json({
                success: false,
                message: "Current day task not found",
            });
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

        const task = challenge.roadmap.find(
            (item) => item.day === day
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
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


