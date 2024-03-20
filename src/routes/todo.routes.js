import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoOfLoggedInUser,
  searchTodo,
  updateTodos,
} from "../controllers/todo.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/createTodo").post(verifyJwt, createTodo);
router.route("/getTodo").get(verifyJwt, getTodoOfLoggedInUser);
router.route("/updateTodo/:_id").patch(verifyJwt, updateTodos);
router.route("/deleteTodo/:_id").delete(verifyJwt, deleteTodo);
router.route("/search").get(verifyJwt, searchTodo);

export default router;
