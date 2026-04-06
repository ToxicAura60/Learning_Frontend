import { Router } from "express";
import { createCourse } from "../modules/course/course.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import sectionRoute from "./section.route"

const router = Router()

router.post("/", authMiddleware, createCourse)

router.use("/:courseSlug/sections", sectionRoute)

export default router