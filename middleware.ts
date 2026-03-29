import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Routes that Clerk should NOT protect (public / webhook)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/AboutUs(.*)',
  '/Proxies(.*)',
  '/Contact(.*)',
  '/GetStarted(.*)',
  '/proxy-manager(.*)',
  '/Docs(.*)',
  '/api/stripe/webhook',   // Stripe sends unauthenticated POST requests here
  '/api/waitlist',          // Public waitlist sign-up
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Exclude Next.js internals, static files, and Clerk auth routes
    '/((?!_next|sign-in|sign-up|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always run for API and trpc routes
    '/(api|trpc)(.*)',
  ],
};