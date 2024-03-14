import express from "express";
import {
    createUser,
    checkUser
}
from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register",createUser);
router.post("/login",checkUser);

export default router;