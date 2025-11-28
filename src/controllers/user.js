import { User } from "../database/Models/index.js";

export const getUsers = async (req, res) => {
  const users = await User.find();

  res.json({
    success: true,
    data: users,
  });

  // res.json(users);
};
