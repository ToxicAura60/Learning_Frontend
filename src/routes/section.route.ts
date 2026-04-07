import { Router } from "express";
import { createSection, deleteSection, listSection, updateSection } from "../modules/section/section.controller";
import lessonRoute from "./lesson.route"

const router = Router({ mergeParams: true })

router.post("/", createSection)

router.get("/", listSection)

router.put("/:sectionSlug", updateSection)

router.delete("/:sectionSlug", deleteSection)

router.use("/:sectionSlug/lessons", lessonRoute)

export default router