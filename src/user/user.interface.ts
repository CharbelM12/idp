import mongoose, { Document } from "mongoose";

interface User extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  age: Number;
  phoneNumber: String;
  createdAt: Date;
  updatedAt: Date;
}
interface Login {
  email: string;
  password: string;
}
interface UpdateProfile {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: String;
}
interface User {
  _id: mongoose.Schema.Types.ObjectId;
}
interface UserRequest extends Request {
  user?: User;
}
interface VerifyToken {
  token: string;
}
export { User, Login, UpdateProfile, UserRequest, VerifyToken };
