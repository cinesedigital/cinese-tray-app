import { NextResponse, NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import ClientRepository from '@/repository/ClientRepository';
import PaymentGatewayClientService from '@/services/PaymentGatewayClientService';

const clientRepository = new ClientRepository();
const paymentGatewayClientService = new PaymentGatewayClientService();

interface RegisterBody {
    name: string,
    email: string,
    password: string,
    cpfCnpj: string,
    phone: string,
}

export async function POST(request: NextRequest) {

    const accessToken = request.headers.get('Authorization');

    if (!accessToken || !verifyJwt(accessToken)) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const body = await request.json();
        
        const { name, email, password, cpfCnpj, phone }: RegisterBody = body.data ?? body;
        
        if (!name || !email || !password || !cpfCnpj || !phone) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        await paymentGatewayClientService.createUser({ name, email, cpfCnpj, phone });
        
        const user = await clientRepository.createUser({ name, email, password });
        
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
            console.log(error);
            return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
        }
    }


}