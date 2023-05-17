/**

This file contains a middleware that protects specific routes by
requiring authentication using NextAuth.
Unauthenticated users will be redirected to the sign-in page.
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