import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(

    function middleware(request: NextRequestWithAuth) {
        if (request.nextUrl.pathname.startsWith("/dashboard")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.redirect(new URL("/login?error=user not allowed", request.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/dashboard"] }