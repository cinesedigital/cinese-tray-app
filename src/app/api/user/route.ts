import { NextResponse, NextRequest  } from 'next/server';
import { cineseClientService } from '@/lib/ClientService';
import { verifyJwt, isAdminRole } from '@/lib/jwt';

export interface RegisterBody {
    name: string,
    email: string,
    password: string,
    cpfCnpj: string,
    phone: string,
    store: string
}

export async function POST(request: NextRequest) {

    try {
        const body = await request.json();
        
        const { name, email, password, cpfCnpj, phone, store }: RegisterBody = body.data ?? body;
        
        if (!name || !email || !password || !cpfCnpj || !phone || !store) {
            console.log(body);
            return new NextResponse("Missing fields", { status: 400 });
        }

        const user = await cineseClientService.createUser({ name, email, password, cpfCnpj, phone, store });

        return new NextResponse(JSON.stringify(user), { status: 201 });

    }
    catch (error: any) {
        if (error.message === "User already exists") {
            return new NextResponse(JSON.stringify({ error: "User already exists" }), { status: 409 });
        }
        else if (error.message === "Missing fields") {
            return new NextResponse(JSON.stringify({ error: "Missing fields" }), { status: 400 });
        }
        else if (error.message === "Error creating payment gateway user") {
            return new NextResponse(JSON.stringify({ error: "Error creating payment gateway user" }), { status: 500 });
        }
        else {
            return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
        }
    }
}

export async function GET(request: NextRequest) {
    const accessToken = request.headers.get('Authorization');
    if (!accessToken || !verifyJwt(accessToken) || !isAdminRole(accessToken)) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const users = await cineseClientService.getAllUsers();

    return new NextResponse(JSON.stringify(users), { status: 200 });
}