import { Router } from "express";
import authRoute from "./auth.route"
import lessonRoute from "./lesson.route"

const router = Router()

router.use("/auth", authRoute)
router.use("/lesson", lessonRoute)

export default router