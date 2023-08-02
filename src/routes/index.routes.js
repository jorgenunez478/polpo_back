import { Router } from "express";
import { auth } from "../controllers/index.controller.js";

const router = Router();

router.get('/auth', auth);

export default router;