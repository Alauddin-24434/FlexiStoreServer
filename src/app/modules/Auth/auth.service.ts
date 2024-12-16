
import bcrypt from "bcryptjs";
import { TUser } from "./auth.interface";

import { generateTokens } from "../../utils/generateTokens";
import { prisma } from "../../utils/prismaClient";


export const registerIntoDb = async (payload: TUser) => {
  // chek if the imal already exist
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists. Please use a different email.");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(payload.password, 12);
  //   create newUser
  const newUser = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
    },
  });
  // Create JWT payload
  const jwtPayload = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };

  const tokenGenerate = generateTokens(jwtPayload);

  return { newUser, tokenGenerate };
};

export const loginIntoDb = async (payload: TUser) => {
  // check the exist email
  const isFindUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isFindUser) {
    throw new Error("user not found");
  }
  // Compare the provided password with the stored hashed password
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    isFindUser.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Incorrect password");
  }

  // Create JWT payload
  const jwtPayload = {
    id: isFindUser.id,
    name: isFindUser.name,
    email: isFindUser.email,
    role: isFindUser.role,
  };

  // Generate JWT token
  const tokenGenerate = generateTokens(jwtPayload);

  return { isFindUser, tokenGenerate };
};
