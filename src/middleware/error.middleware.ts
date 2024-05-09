import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse = JSON.parse(JSON.stringify(error.message));
  const response = {
    message: errorResponse || "Something went wrong",
  };
  const status = error.status || 500;
  if (error && error.message === "Validation Failed") {
    res.status(400).send(response);
  } else {
    res.status(status).send(response);
  }
};
export default errorMiddleware;
