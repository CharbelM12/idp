import userModel from "./user.model";
import { User, Login, UpdateProfile, VerifyToken } from "./user.interface";
import statusCodes from "../configurations/errorCodes.config";
import mongoose from "mongoose";
import { SHA256 } from "crypto-js";
import moment from "moment";
import config from "../configurations/config";
import errorMessages from "../errorMessages";
import { generateAccessTokens, verifyJwt } from "../utils/jwt.utils";
import { CustomError } from "../utils/common-interfaces.utils";

class UserService {
  async signup(reqBody: User) {
    const user = await userModel.findOne({ email: reqBody.email });
    if (user) {
      const error = new Error(errorMessages.emailAlreadyExist) as CustomError;
      error.status = statusCodes.conflict;
      throw error;
    } else {
      await new userModel({
        ...reqBody,
        password: SHA256(reqBody.password as string).toString(),
        age: await this.getUserAge(reqBody.dateOfBirth),
      }).save();
    }
  }

  async login(reqBody: Login) {
    const user = await userModel.findOne({ email: reqBody.email });
    if (!user) {
      const error = new Error(
        errorMessages.incorrectCredentials
      ) as CustomError;
      error.status = statusCodes.notAuthenticated;
      throw error;
    } else {
      if (user.password !== SHA256(reqBody.password as string).toString()) {
        const error = new Error(
          errorMessages.incorrectCredentials
        ) as CustomError;
        error.status = statusCodes.notAuthenticated;
        throw error;
      } else {
        return this.generateLoginResponse(user);
      }
    }
  }
  async getProfile(userId: mongoose.Schema.Types.ObjectId) {
    return userModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId.toString()) },
      },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          dateOfBirth: 1,
        },
      },
    ]);
  }
  async updateProfile(
    userId: mongoose.Schema.Types.ObjectId,
    reqBody: UpdateProfile
  ) {
    return userModel.updateOne(
      { _id: userId },
      {
        $set: reqBody,
        age: await this.getUserAge(reqBody.dateOfBirth),
      }
    );
  }
  private async getUserAge(dateOfBirth: Date) {
    return moment().diff(dateOfBirth, "years");
  }
  async verifyToken(authHeader: string) {
    if (!authHeader) {
      const error = new Error(errorMessages.missingJwt) as CustomError;
      error.status = statusCodes.notAuthenticated;
      throw error;
    } else {
      const token = authHeader!.split(" ")[1];
      const decodedToken = verifyJwt(token);
      return {
        userId: decodedToken.userId,
        userAge: decodedToken.userAge,
        userPhoneNumber: decodedToken.userPhoneNumber,
        userFirstName: decodedToken.userFirstName,
        userLastName: decodedToken.userLastName,
      };
    }
  }
  private async generateLoginResponse(user: User) {
    const payload = {
      userId: user._id,
      userAge: user.age,
      userPhoneNumber: user.phoneNumber,
      userFirstName: user.firstName,
      userLastName: user.lastName,
    };
    console.log(payload);
    const accessToken = generateAccessTokens(payload);
    const tokenExpiration = moment()
      .add(
        config.momentAddParams.duration as moment.DurationInputArg1,
        config.momentAddParams.unit as moment.DurationInputArg2
      )
      .toDate();
    const userId = user._id;
    return { accessToken, tokenExpiration, userId };
  }
}
export default UserService;
