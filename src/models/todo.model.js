import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";
const todoSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
