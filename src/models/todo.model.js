import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";
const todoSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "in progress"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // Define priority levels
      default: "low", // Default priority level
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
