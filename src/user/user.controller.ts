import { Request, Response, NextFunction } from "express";
import UserService from "./user.service";
const userService = new UserService();
class UserController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.signup(req.body);
      res.end();
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, tokenExpiration, userId } = await userService.login(
        req.body
      );
      res.send({
        accessToken: accessToken,
        tokenExpiration: tokenExpiration,
        userId: userId,
      });
    } catch (error) {
      next(error);
    }
  }
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await userService.getProfile((req as any).userId);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.updateProfile((req as any).userId, req.body);
      res.end();
    } catch (error) {
      next(error);
    }
  }
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, userAge } = await userService.verifyToken(
        req.headers.authorization!
      );
      res.send({
        userId: userId,
        userAge: userAge,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
