/**
 * handles the authentication of the user
 * https://next-auth.js.org/configuration/options
 *
 * @CredentialsProvider https://next-auth.js.org/configuration/providers/credentials
 * @returns user object eg {name: "John Doe", email: "..."} or null if not authenticated
 */

import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  // use prisma adapter
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",

      // credentials is used to generate a form on the sign in page.
      // specify fields that are expected to be submitted.
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // check if there is email and password
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        // use prisma to query if there is a user with the email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // use jwt for session
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// initialize handler with the authOptions defined above
const handler = NextAuth(authOptions);

// Next.js will automatically route HTTP GET and POST requests to handler
export { handler as GET, handler as POST };
