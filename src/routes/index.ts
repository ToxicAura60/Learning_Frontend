import { Router } from "express";
import authRoute from "./auth.route"
import courseRoute from "./course.route"

const router = Router()

router.use("/auth", authRoute)
router.use("/course", courseRoute)

export default router