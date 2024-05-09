import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("authorization");
  const decodedToken = verifyJwt(token);
  (req as any).userId = decodedToken.userId;
  (req as any).userAge = decodedToken.userAge;
  next();
};
export default isAuth;
