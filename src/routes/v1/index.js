import { Router } from "express";

// middleware imports
import { requiresAuthentication } from "../../middleware/auth.js";

// router imports
import { authRouter } from "./auth.js";
import { usersRouter } from "./user.js";

const v1Router = Router();

// PUBLIC ROUTES (do not require a user to be logged in in order to access them)
// /api/v1
v1Router.get("/", (req, res) => {
  res.send("Hello from v1");
});

// /api/v1/auth
v1Router.use("/auth", authRouter);

// PRIVATE ROUTES (require a user to be logged in in order to access them)
v1Router.use(requiresAuthentication); // This middleware protects ALL routes after it

// /api/v1/users
v1Router.use("/users", usersRouter);

// /api/v1/protected
v1Router.get("/protected", (req, res) => {
  res.json({
    message: "This is a protected route",
  });
});

export { v1Router };
