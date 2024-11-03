import { Storage } from "megajs";

export function getLoggedInStorage() {
  const email = process.env.NEXT_PUBLIC_MEGA_EMAIL;
  const password = process.env.NEXT_PUBLIC_MEGA_PASS;

  // Set up a user-agent
  const userAgent = "MEGAJS-Demos (+https://mega.js.org/)";
  return new Storage({ email, password, userAgent }).ready;
}
