import express from "express";
import { test, updateUser, deleteUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/validUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.post("/delete/:id", deleteUser);

export default router;
