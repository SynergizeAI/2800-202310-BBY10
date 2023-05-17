/*
    Next.JS has a built-in middleware function that can be used to protect routes.
    Middleware allows you to run code before a request is completed.
		https://next-auth.js.org/configuration/nextjs#middleware

    @withAuth will redirect the user to the sign in page if they are not signed in.
    @config is used to specify which routes should be protected.
    @matcher is used to specify which routes should be protected.
    @:path* is a wildcard that will match any route that starts with /users.
*/

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/users/:path*"],
};
