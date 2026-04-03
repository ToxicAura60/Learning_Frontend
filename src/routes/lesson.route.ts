import { Router } from "express";
import { createLesson } from "../modules/lesson/lesson.controller";

const router = Router()

router.post("/", createLesson)

export default router