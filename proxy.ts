import { NextRequest, NextResponse } from "next/server"

const publicRoutes = [
    "/auth",
]

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const token = request.cookies.get("token")?.value

    const isPublicRoute = publicRoutes.some(
        (route) =>
            pathname === route ||
            pathname.startsWith(`${route}/`)
    )

    if (!isPublicRoute && !token) {
        return NextResponse.redirect(
            new URL("/auth/login", request.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
