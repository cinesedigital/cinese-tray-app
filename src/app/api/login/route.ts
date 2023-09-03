import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { signJwtAccessToken } from '@/lib/jwt';
import { cineseClientService } from '@/lib/ClientService';

type RequestBody = {
    email: string;
    password: string;
}

export async function POST(request:Request){
    
    const body: RequestBody = await request.json();

    const user = await cineseClientService.getUserByEmail(body.email);

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