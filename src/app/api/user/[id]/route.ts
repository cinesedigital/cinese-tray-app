import { NextResponse } from 'next/server';
import { cineseClientService } from '@/lib/ClientService';
import { verifyJwt, isAdminRole } from '@/lib/jwt';

export async function GET(request:Request, {params}: {params: {id: string}}){
    const accessToken = request.headers.get('Authorization');
    if(!accessToken || !verifyJwt(accessToken) || !isAdminRole(accessToken)){
        return new Response(JSON.stringify({error: "Unauthorized"}), {status: 401});
    }

    const user = await cineseClientService.getUserById(params.id);

    if(!user){
        return new NextResponse(null, {status: 404});
    }
    const {hashedPassword, ...userWithoutPassword} = user;
    return NextResponse.json(userWithoutPassword);
}

export async function DELETE(request:Request, {params}: {params: {id: string}}){
    const accessToken = request.headers.get('Authorization');

    if(!accessToken || !verifyJwt(accessToken)){
        return new Response(JSON.stringify({error: "Unauthorized"}), {status: 401});
    }

    try{
        const user = await cineseClientService.deleteUserById(params.id);
        return NextResponse.json(user);
    }
    catch(error:any){
        if(error.message === "User not found"){
            return new NextResponse(JSON.stringify({error: "User not found"}), {status: 404});
        }
        else if(error.message === "Error deleting payment gateway user"){
            return new NextResponse(JSON.stringify({error: "Error deleting payment gateway user"}), {status: 500});
        }
        else{
            return new NextResponse(JSON.stringify({error: "Internal server error"}), {status: 500});
        }
    }
    
}