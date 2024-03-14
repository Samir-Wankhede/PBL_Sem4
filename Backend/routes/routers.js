import express from "express";
import {
    getHome,
    getRegister,
    getLogin,
    createUser,
    checkUser
}
from "../controllers/userControllers.js";

const router = express.Router();

router.get("/",getHome);
router.get("/register",getRegister);
router.get("/login",getLogin);
router.post("/register",createUser);
router.post("/login",checkUser);
router.get("/student",()=>{});

export default router;