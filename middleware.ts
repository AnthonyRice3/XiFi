import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Exclude Next.js internals, static files, and Clerk auth routes
    '/((?!_next|sign-in|sign-up|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always run for API and trpc routes
    '/(api|trpc)(.*)',
  ],
};