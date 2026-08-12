// Kept separate from auth.ts so src/middleware.ts (Edge runtime) can import
// just the cookie name without pulling in auth.ts's top-level `crypto`
// import, which Edge Runtime can't bundle.
export const SESSION_COOKIE_NAME = "ps_admin_session";
