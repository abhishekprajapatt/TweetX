import express from "express";
import {bookmarks, follow, getOthersUsers, getProfile, login, logout, register, unfollow} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/:id").get(isAuthenticated, getProfile)
router.route("/otherusers/:id").get(isAuthenticated, getOthersUsers)
router.route("/bookmark/:id").put(isAuthenticated, bookmarks)
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/unfollow/:id").post(isAuthenticated, unfollow);

export default router;