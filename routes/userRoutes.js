import express from "express";
import {
  login,
  logout,
  register,
} from "../controllers/userController.js";


import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(isAuthenticated,login);
router.route("/logout").get(logout);


export default router;
