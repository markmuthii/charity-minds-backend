import { User } from "../database/Models/index.js";

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.json({
    success: true,
    data: users,
  });
};
