import taskModel from "../model/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({}).sort({ day: 1 });
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error fetching tasks",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { day, track, task, description, difficulty_level, requirements, acceptanceCriteria, resources } = req.body;

    if (!day || !track || !task) {
      return res.status(400).json({
        success: false,
        message: "Day, track, and task title are required fields",
      });
    }

    const newTask = new taskModel({
      day,
      track,
      task,
      description,
      difficulty_level,
      requirements,
      acceptanceCriteria,
      resources,
    });

    await newTask.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error creating task",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { day, track, task, description, difficulty_level, requirements, acceptanceCriteria, resources } = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      {
        day,
        track,
        task,
        description,
        difficulty_level,
        requirements,
        acceptanceCriteria,
        resources,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error updating task",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await taskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error deleting task",
    });
  }
};
