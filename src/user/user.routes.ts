import { Router } from "express";
import { validate } from "express-validation";
import userValidation from "./user.validation";
import UserController from "./user.controller";
import isAuth from "../middleware/isAuth.middleware";
const userController = new UserController();

const router = Router();

router.post("/signup", validate(userValidation.signup), userController.signup);

router.post("/login", validate(userValidation.login), userController.login);

router.get("/profile", isAuth, userController.getProfile);

router.put("/profile", isAuth, userController.updateProfile);
router.post("/verify-token", userController.verifyToken);

export default router;
