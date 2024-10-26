// middleware.ts
// import jwt from 'jsonwebtoken';
import { verify } from '@/utils/jwt';
import { Console } from 'console';
import { NextRequest, NextResponse } from 'next/server';
// import { Users } from './models/users';

export default async function middleware(req: NextRequest) {

    try {

        console.debug('---------------------------------------------------------------------middleware')

        if(!await isAuthenticated(req)) return handleNotAuthenticated(req);

        return NextResponse.next();
        
    } catch(error) {
        
        console.log(error)
        return handleNotAuthenticated(req);
    
    }
    
}

//  running middleware on specific paths.
export const config = {
    matcher: ['/auth', '/auth/:path*', '/api/auth/:path*'], 
    // matcher: ['app/auth', '/api/auth/:path*'],
}

async function isAuthenticated(req: NextRequest):Promise<boolean> {

    try {

        const response = new NextResponse()

        let authorization= <string>req.headers.get('authorization');

        if(!authorization) authorization = req.cookies.get('auth')?.value as string;

        const token = authorization.replace('Bearer ', '');
        
        if(!token) return false

        const decodedToken = await verify(token, process.env.ACCESS_TOKEN as string)

        return decodedToken.id ? true : false;
        
    } catch(error) {
        
        console.log(error)
        return false
    
    }


}

function handleNotAuthenticated(request: NextRequest): NextResponse | undefined {

    try {
        
        const { pathname } = request.nextUrl

        console.log('pathname: ', pathname) 
    
        if(pathname.startsWith('/auth')) return NextResponse.redirect(new URL('/login', request.url))
        if(pathname.startsWith('/api')) return NextResponse.redirect(new URL('/api/unauthorized', request.url));

    } catch(error) {

        console.log(error)

    }

}