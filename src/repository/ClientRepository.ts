import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export type ClientData = {
    id: string
    name: string,
    email: string,
    password: string,
}

export default class ClientRepository {

    createUser = async (client: ClientData) => {
        const {id, name, email, password} = client;

        if(!id || !name || !email || !password){
            throw new Error("Missing fields");
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await prisma.user.create({
            data: {
                id,
                name,
                email,
                hashedPassword
            }
        });
        const {hashedPassword: _, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }

    getUserByEmail = async (email: string) => {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return user;
    }

    getUserById = async (id: string) => {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        return user;
    }

    exists = async (email: string) => {

        const exist = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        return exist ? true : false;
    }

    deleteUserById = async (id: string) => {
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        });

        return user;
    }

    getAllUsers = async () => {
        const users = await prisma.user.findMany();
        return users;
    }
    
}