import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Todo } from "../models/todo.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
const createTodo = asyncHandler(async (req, res) => {
  let { title, content, status, priority, dueDate } = req.body;
  if (title) {
    title = title.trim();
  }
  if (!title) {
    throw new ApiError(400, "Title is required");
  }
  const createdBy = req.user?._id;
  if (!createdBy) {
    throw new ApiError(400, "User not logged in");
  }

  const todo = await Todo.create({
    title,
    content,
    status: status || "pending",
    createdBy, // Store createdBy as _id
    priority,
    dueDate,
  });

  // Populate createdBy field with username before sending response
  await todo.populate("createdBy", "username");

  return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo created successfully"));
});

const getTodoOfLoggedInUser = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  const todo = await Todo.find({ createdBy: user });
  if (todo.length == 0) {
    throw new ApiError(404, "todo not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, todo, "todo created by user"));
});

const updateTodos = asyncHandler(async (req, res) => {
  const { title, content, status, priority, dueDate } = req.body;
  const updateFields = {};

  // Check and add each field to the update object if it exists
  if (title) updateFields.title = title;
  if (content) updateFields.content = content;
  if (status) updateFields.status = status;
  if (priority) updateFields.priority = priority;
  if (dueDate) updateFields.dueDate = dueDate;

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "At least one field is required for update");
  }

  // Validate status if provided
  if (
    updateFields.status &&
    !["pending", "completed", "in progress"].includes(updateFields.status)
  ) {
    throw new ApiError(400, "Invalid status");
  }

  // Validate priority if provided
  if (
    updateFields.priority &&
    !["low", "medium", "high"].includes(updateFields.priority)
  ) {
    throw new ApiError(400, "Invalid priority");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params?._id,
    { $set: updateFields },
    { new: true }
  );

  if (!updatedTodo) {
    throw new ApiError(400, "Todo not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedTodo, "Todo updated successfully"));
});

const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params?._id);
    if (!deletedTodo) {
      throw new ApiError(404, "Todo not found");
    }
    res.status(200).json(new ApiResponse(200, "todo deleted successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(500, error, "internal server error"));
  }
});

export { createTodo, getTodoOfLoggedInUser, updateTodos, deleteTodo };
