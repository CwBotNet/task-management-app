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

export const getEmployesByBranch = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let employeData = await getEmployByBranchName(req.params.branch);
    if (!employeData) {
      return res.status(404).json({ message: "No Employees Found" });
    }

    return res
      .status(200)
      .json({ numberOfTasks: employeData.length, tasks: employeData });
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ message: "somthing went wrong" });
  }
};

export const getTaskByEmploy = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const employName = await getTaskByEmployName(req.params.employName);
    console.log(employName);

    if (!employName) {
      return res.status(404).json({ message: "No Tasks Found" });
    }

    return res
      .status(200)
      .json({ numberOfTasks: employName.length, tasks: employName });
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ message: "somthing went wrong" });
  }
};

// fix this Function
export const getTaskByAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const admin = req.params.name;
    const tasks = await getTasksByTaskGaver(admin);
    if (!admin) {
      return res.status(400).json({ message: "admin field is empty" });
    }

    return res.status(200).json({ numberOfTask: tasks.length, tasks: tasks });
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ message: "somthing went wrong" });
  }
};

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

export const updateTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const {
      branch,
      employName,
      taskTitle,
      taskDetail,
      startTime,
      endTime,
      taskGivenBy,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await getTasksbyId(id);

    if (user == null || undefined) {
      return res.status(400).json({ message: "No Task Found with this ID" });
    }

    console.log(user);

    const updatedTask = await updateTaskById(id, {
      branch,
      employName,
      taskTitle,
      taskDetail,
      startTime,
      endTime,
      taskGivenBy,
    });

    res.status(200).json({ message: "Updated successfully", task: req.body });
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ message: "somthing went wrong" });
  }
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Could not find the task" });
    }

    const deleteId = await getTasksbyId(id);

    console.log(deleteId);
    if (deleteId == null || undefined) {
      return res.status(400).json({ message: "task not found" });
    }
    const deletedTask = await deleteTaskById(id);

    return res
      .status(200)
      .json({ message: "task deleted successfully", task: deletedTask });
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ message: "somthing went wrong" });
  }
};
