import jwt from "jsonwebtoken";

export const generateJwtToken = (res, user) => {
  // Create the token using the user info as the payload
  // {
  //   user: {
  //     _id: "45hjh34hjg3h45g6hgih324h"
  //   }
  // }
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Store the token in the cookies
  res.cookie(process.env.AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};
