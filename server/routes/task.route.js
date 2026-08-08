import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/task.controller.js";

const router = express.Router();

router.get("/", auth, admin, getTasks);
router.post("/", auth, admin, createTask);
router.put("/:id", auth, admin, updateTask);
router.delete("/:id", auth, admin, deleteTask);

export default router;
