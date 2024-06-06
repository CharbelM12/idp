import { Schema, model } from "mongoose";
import { User } from "./user.interface";
import config from "../configurations/config";

const userSchema = new Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    age: Number,
    phoneNumber: String,
  },
  { timestamps: config.timestamps.timestampsValue }
);

userSchema.index({ email: 1 });

const userModel = model<User>(config.collections.userCollection, userSchema);

export default userModel;
