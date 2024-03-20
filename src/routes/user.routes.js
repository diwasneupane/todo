import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secure routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/changePassword").post(verifyJwt, changeCurrentPassword);
router.route("/getCurrentUser").get(verifyJwt, getCurrentUser);
router.route("/updateUser").patch(verifyJwt, updateUserDetails);

export default router;
