import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../configurations/config";
import errorMessages from "../errorMessages";
import statusCodes from "../configurations/errorCodes.config";
import { CustomError } from "./common-interfaces.utils";

const generateAccessTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, config.tokens.accessTokenSecret!, {
    expiresIn: config.tokens.accessTokenExpiry,
  });
  return accessToken;
};

const verifyJwt = (token: string | undefined) => {
  let decodedToken: JwtPayload;
  if (!token) {
    const error = new Error(errorMessages.missingJwt) as CustomError;
    error.status = statusCodes.notAuthenticated;
    throw error;
  } else {
    try {
      decodedToken = jwt.verify(
        token,
        config.tokens.accessTokenSecret!
      ) as JwtPayload;
    } catch (error: any) {
      error = new Error(errorMessages.invalidJwt) as CustomError;
      error.status = statusCodes.notAuthenticated;
      throw error;
    }
    return decodedToken;
  }
};
export { generateAccessTokens, verifyJwt };
