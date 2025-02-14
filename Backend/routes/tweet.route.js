import express from 'express';
import { CreateTweet, DeleteTweet, LikeOrDislike } from '../controllers/tweet.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/createtweet').post(isAuthenticated, CreateTweet);
router.route('/delete/:id').delete(isAuthenticated, DeleteTweet);
router.route('/like/:id').put(isAuthenticated, LikeOrDislike);

export default router;
