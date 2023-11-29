import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  branch: { type: String, required: true },
  employName: { type: String, required: true },
  taskTitle: { type: String, required: true },
  taskDetail: { type: String, required: false },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  taskGivenBy: { type: String, required: true },
});

export const TaskModel = mongoose.model("Task", TaskSchema);

export const createTask = (values: Record<string, any>) =>
  new TaskModel(values).save().then((task) => task.toObject());

// get all task function
export const getAllTask = () => TaskModel.find();

// updata a task by id
export const updateTaskById = (id: string, value: Record<string, any>) =>
  TaskModel.findByIdAndUpdate(id, value);

// delete task by ID
export const deleteTaskById = (id: string) =>
  TaskModel.findOneAndDelete({ _id: id });

// get task by branch name
export const getEmployByBranchName = (branch: string) =>
  TaskModel.find({ branch });

// get task by type
export const getTasksbyType = (taskTitle: string) =>
  TaskModel.findOne({ taskTitle });

// get task by id
export const getTasksbyId = (id: string) => TaskModel.findById({ _id: id });

// get task by employName
export const getTaskByEmployName = (employName: String) =>
  TaskModel.find({ employName: employName });

// get tasks by task gaver
export const getTasksByTaskGaver = (taskGaver: string) =>
  TaskModel.find({ taskGaver });
