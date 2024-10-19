import { authMiddleware } from "better-auth/next-js";

export default authMiddleware({
  redirectTo: "/login", // redirect to this path if the user is not authenticated
});

export const config = {
  // use middleware on all routes except login and register
  matcher: ["/app"],
};
