import jwt from "jsonwebtoken";

export const requiresAuthentication = (req, res, next) => {
  // Check if the auth cookie exists. If it does not, then respond with Unauthorized
  const token = req.cookies[process.env.AUTH_COOKIE_NAME];

  if (!token) {
    return res.status(401).json({
      message: "You are not authenticated.",
    });
  }

  try {
    // Check that the token is valid
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Token is valid, and the payload contains our user object
    req.userId = payload.user._id;
    next();
  } catch (error) {
    // Token is invalid
    return res.status(401).json({
      message: "You are not authenticated.",
    });
  }
};
