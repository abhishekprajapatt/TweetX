import express from "express";
import {bookmarks, getOthersUsers, getProfile, login, logout, register} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/:id").get(isAuthenticated, getProfile)
router.route("/otherusers/:id").get(isAuthenticated, getOthersUsers)
router.route("/bookmark/:id").put(isAuthenticated, bookmarks)

export default router;