
/**
=======
    Next.JS has a built-in middleware function that can be used to protect routes.
    Middleware allows you to run code before a request is completed.
		https://next-auth.js.org/configuration/nextjs#middleware

    @withAuth will redirect the user to the sign in page if they are not signed in.
    @config is used to specify which routes should be protected.
    @matcher is used to specify which routes should be protected.
    @:path* is a wildcard that will match any route that starts with /users.
*/

// Import the withAuth middleware from NextAuth
import { withAuth } from "next-auth/middleware";

// Define and export the middleware configuration
export default withAuth({

// Specify the sign-in page path to redirect unauthenticated users
pages: {
signIn: "/",
},
});

// Additional configuration settings for the middleware
export const config = {

// Define an array of URL patterns to match specific routes
// that require authentication
matcher: ["/conversations/:path*", "/users/:path*"],
};
