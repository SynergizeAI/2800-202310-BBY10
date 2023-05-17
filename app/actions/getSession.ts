/**
 * Retrieves the session object from server-side
 * will correctly update the cookie expiry time and update the session content
 * https://next-auth.js.org/configuration/nextjs#getserversession
 * @returns {Promise<Session>} The session object
 */

import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function getSession() {
  return await getServerSession(authOptions);
}
