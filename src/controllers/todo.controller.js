import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Todo } from "../models/todo.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
const createTodo = asyncHandler(async (req, res) => {
  let { title, content, status, priority } = req.body;
  if (title) {
    title = title.trim();
  }
  if (!title) {
    throw new ApiError(400, "title is required");
  }
  const createdBy = req.user?._id;
  if (!createdBy) {
    throw new ApiError(400, "user not logged in");
  }

  const todo = await Todo.create({
    title,
    content,
    status: status || "pending",
    createdBy,
    priority,
  });
  const createdTodo = await Todo.findById(todo?._id);
  if (!createdTodo) {
    throw new ApiError(400, "error while creating todo");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdTodo, "todo created successfully"));
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
  const { title, content, status, priority } = req.body;
  if (!(title || content || status || priority)) {
    throw new ApiError(400, "title or content or status is required");
  }
  const todoStatus = ["pending", "completed", "in progress"];
  if (!todoStatus.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }
  const todoPriorty = ["low", "medium", "high"];
  if (!todoPriorty.includes(priority)) {
    throw new ApiError(400, "invalid priority");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params?._id,
    {
      $set: {
        title: title,
        content: content,
        status: status,
        priority: priority,
      },
    },
    { new: true }
  );
  //   console.log(req.params?._id);

  if (!updatedTodo) {
    throw new ApiError(400, "Todo not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, updatedTodo, "todo updated successfully"));
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
