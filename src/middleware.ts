import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(

    function middleware(request: NextRequestWithAuth) {

        if (request.nextUrl.pathname.startsWith("/dashboard")) {
            if (!request.nextauth?.token || request.nextauth?.token?.exp as number < Date.now() / 1000){
                console.log("You are not authorized!")
                return NextResponse.rewrite(
                    new URL("/login?message=You Are Not Authorized!", request.url)
                );
            }
        }

    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = { matcher: ["/dashboard/:path*"] }