import express from "express";

import {
  deleteTaskById,
  getAllTask,
  getEmployByBranchName,
  getTaskByEmployName,
  getTasksByTaskGaver,
  getTasksbyType,
  createTask,
  updateTaskById,
  getTasksbyId,
} from "../db/tasks";

export const addTasks = async (req: express.Request, res: express.Response) => {
  try {
    const {
      branch,
      employName,
      taskDetail,
      taskTitle,
      startTime,
      endTime,
      taskGivenBy,
    } = req.body;

    if (
      !branch ||
      !employName ||
      !taskDetail ||
      !taskTitle ||
      !startTime ||
      !endTime ||
      !taskGivenBy
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingTask = await getTasksbyType(taskTitle);

    if (existingTask) {
      return res
        .status(400)
        .json({ message: "task already exiests", task: existingTask });
    }

    const task = await createTask({
      branch,
      employName,
      taskDetail,
      taskTitle,
      startTime,
      endTime,
      taskGivenBy,
    });

    return res.status(200).json(task).end();
  } catch (error) {
    console.log(error);
    res
      .sendStatus(400)
      .json({ message: `somthing is wrong in connection ${error}` });
  }
};

export const GetAllTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const tasks = await getAllTask();
    const taskCount = tasks.length;
    return res.status(200).json({ count: taskCount, data: tasks });
  } catch (error) {
    console.log(error);
    res
      .sendStatus(400)
      .json({ message: `somthing is worng in connection ${error}` });
  }
};
