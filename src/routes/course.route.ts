import { Router } from "express";
import { createCourse, deleteCourse, listCourse, updateCourse } from "../modules/course/course.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import sectionRoute from "./section.route"

const router = Router()

router.post("/", authMiddleware, createCourse)

router.get("/", listCourse)

router.put("/:courseSlug", updateCourse)

router.delete("/:courseSlug", deleteCourse)

router.use("/:courseSlug/sections", sectionRoute)



export default router