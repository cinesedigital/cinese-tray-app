import { NextRequest, NextResponse } from "next/server";
import { cineseAppService } from "@/lib/AppService";

export async function GET(request:NextRequest){
    
    const apps = await cineseAppService.getAllApps();
    return new NextResponse(JSON.stringify(apps), {status: 200});

}