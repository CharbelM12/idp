import mongoose from "mongoose";
import config from "../configurations/config";
const connect = async () => {
  await mongoose.connect(config.mongoUri!);
};
export default connect;
