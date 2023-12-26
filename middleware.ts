import { authMiddleware } from "@clerk/nextjs/server";

// go to docs for adding public routes
export default authMiddleware({
    publicRoutes: ['/']
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};