import dotenv from 'dotenv';
import { access } from 'fs';

// Load environment variables from the .env file
dotenv.config();

const config = {
  port: process.env.PORT || 5000,  // Default to 3000 if PORT is not set
  nodeEnv: process.env.NODE_ENV,  // Default to 'development' if NODE_ENV is not set
  dbUrl: process.env.DATABASE_URL,  // MongoDB connection string from .env
  bcrypt_salts_round:process.env.BCRYPT_SALT_ROUNDS,
  jwt:{
   access_secrect:process.env.JWT_ACCESS_SECRET,
   access_expireIn:process.env.JWT_ACCESS_EXPIRES_IN,
   refresh_secrect:process.env.JWT_REFRESH_SECRET,
   refresh_expireIn:process.env.JWT_REFRESH_EXPIRES_IN,
  }
  
};

export default config;