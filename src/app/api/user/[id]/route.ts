import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyJwt } from '@/lib/jwt';

const prisma = new PrismaClient();

export async function GET(request:Request, {params}: {params: {id: string}}){
    const accessToken = request.headers.get('Authorization');

    if(!accessToken || !verifyJwt(accessToken)){
        return new Response(JSON.stringify({error: "Unauthorized"}), {status: 401});
    }

    const user = await prisma.user.findUnique({
        where: {
            id: params.id
        }
    });

    if(!user){
        return new NextResponse(null, {status: 404});
    }
    const {hashedPassword, ...userWithoutPassword} = user;
    return NextResponse.json(userWithoutPassword);
}