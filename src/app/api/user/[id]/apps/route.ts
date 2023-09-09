import { NextRequest, NextResponse } from "next/server";
import {cineseAppService} from "@/lib/AppService";
import { verifyJwt } from "@/lib/jwt";

export async function GET(request:NextRequest, {params}: {params: {id: string}}){
    const accessToken = request.headers.get('Authorization');
    if(!accessToken || !verifyJwt(accessToken)){
        return new Response(JSON.stringify({error: "Unauthorized"}), {status: 401});
    }

    const apps = await cineseAppService.getUserApps(params.id);
    return new NextResponse(JSON.stringify(apps), {status: 200});
}