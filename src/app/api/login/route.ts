import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt';
import { signJwtAccessToken } from '@/lib/jwt';



type RequestBody = {
    email: string;
    password: string;
}

export async function POST(request:Request){
    
    const body: RequestBody = await request.json();

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });

    if(!user){
        return new NextResponse(null, {status: 401});
    }

    const passwordsMatch = await bcrypt.compare(body.password, user.hashedPassword);

    if(user && passwordsMatch){
        const {hashedPassword, ...userWihoutPass} = user;
        const accessToken = signJwtAccessToken(userWihoutPass);
        const result = {
            ...userWihoutPass,
            accessToken
        }
        return NextResponse.json(result);
    }
    else{
        return new NextResponse(null, {status: 401});
    }

    
}