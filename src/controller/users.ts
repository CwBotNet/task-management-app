import { getTaskByEmployName } from "../db/tasks";
import express from "express";

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
