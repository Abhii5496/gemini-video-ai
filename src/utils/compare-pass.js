"use server";

import { compare } from "bcrypt";

export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
};
