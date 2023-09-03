import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export type ClientData = {
    name: string,
    email: string,
    password: string,
}

export default class ClientRepository {

    createUser = async (client: ClientData) => {
        const {name, email, password} = client;

        if(!name || !email || !password){
            throw new Error("Missing fields");
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });
        const {hashedPassword: _, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }

    exists = async (client: ClientData) => {
        const {email} = client;

        const exist = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        return exist ? true : false;
    }
}