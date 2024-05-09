import dotenv from "dotenv";
dotenv.config();
export default {
  port: process.env.PORT,
  mongoUri: process.env.DB_CONNECTION_STRING,
  tokens: {
    accessTokenExpiry: "1h",
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  },
  timestamps: {
    timestampsValue: true,
  },
  corsHeaders: {
    allowedOrigin: "*",
    allowedMethods: "OPTIONS, GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  },
  collections: {
    userCollection: "User",
  },
  momentAddParams: {
    duration: 1,
    unit: "h",
  },
};
