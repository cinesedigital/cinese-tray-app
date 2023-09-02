import fs from "fs";
import path from "path";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('planId');
    //imprime no console o header da requisição
    console.log(request.headers);

    const filePath = path.join(process.cwd(), 'src', 'scripts', 'voicesearch.js');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    return new NextResponse(fileContents, {
        headers: {
            'Content-Type': 'application/javascript'
        },
    });
}