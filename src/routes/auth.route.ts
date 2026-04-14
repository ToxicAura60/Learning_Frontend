import { Router } from "express";
import { callback, login, refresh, register } from "../modules/auth/auth.controller";

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/refresh", refresh)
router.post("/callback", callback)

export default router