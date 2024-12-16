import { Request, Response } from "express";
import { loginIntoDb, registerIntoDb } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Call the service function to handle registration
    const createUser = await registerIntoDb(body);

    // Extract the created user and tokens
    const { newUser, tokenGenerate } = createUser;
    const { accessToken, refreshToken } = tokenGenerate;

    // Set the refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        user: newUser,
        accessToken, // Include the access token in the response
      },
    });
  } catch (error: any) {
    // Handle errors gracefully
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during registration.",
    });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Call the service function to handle login
    const userLogin = await loginIntoDb(body);

    // Extract user and tokens
    const { isFindUser, tokenGenerate } = userLogin;
    const { accessToken, refreshToken } = tokenGenerate;

    // Set the refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
    });

    // Send response with user data and access token
    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      data: {
        user: isFindUser,
        accessToken, // Include the access token in the response
      },
    });
  } catch (error: any) {
    // Handle errors gracefully
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during login.",
    });
  }
};