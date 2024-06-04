import authConfig from '@entities/user/auth.config';
import NextAuth from 'next-auth';
import { routes } from '@/shared/config/routes';
const { auth: middleware } = NextAuth(authConfig);

const { apiAuthPrefix, privateRoutes, signInRoute, redirectAfterSignInRoute, authRoutes } = routes;

// @ts-ignore
export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(redirectAfterSignInRoute, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && isPrivateRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`${signInRoute}?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
