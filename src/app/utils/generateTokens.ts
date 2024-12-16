import jwt from "jsonwebtoken";
import config from "../config";
export const generateTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, config.jwt.access_secrect as string, {
    expiresIn: config.jwt.access_expireIn,
  });

  const refreshToken = jwt.sign(payload, config.jwt.refresh_secrect as string, {
    expiresIn: config.jwt.refresh_expireIn,
  });
  return { accessToken, refreshToken };
};
