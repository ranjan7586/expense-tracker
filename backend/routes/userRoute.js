import express from 'express';
import { createUser, getAllUsers, siginInUser } from '../controllers/userController.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(siginInUser);
router.route("/users").get(validateToken,getAllUsers);

export default router