import { Router } from "express";
import { createSection } from "../modules/section/section.controller";

const router = Router({ mergeParams: true })

router.post("/", createSection)


export default router