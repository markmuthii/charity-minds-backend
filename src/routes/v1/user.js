import { Router } from "express";
import { getUsers } from "../../controllers/user.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);

export { usersRouter };
