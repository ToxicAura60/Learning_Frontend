import { Router } from "express";
import { createLesson, deleteLesson, listLesson, updateLesson } from "../modules/lesson/lesson.controller";

const router = Router({mergeParams: true})

router.post("/", createLesson)

router.get("/", listLesson)

router.put("/:lessonSlug", updateLesson)

router.delete("/:lessonSlug", deleteLesson)

export default router