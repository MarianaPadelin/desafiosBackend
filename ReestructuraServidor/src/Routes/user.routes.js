import { Router } from "express";
import { authToken } from "../utils.js";
import { getUser } from "../Controllers/user.controller.js";

const router = Router();

router.get("/:userId", authToken, getUser);

export default router;
