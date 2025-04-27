"use server";

import { hash } from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 10; // You can adjust the salt rounds for security
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};
