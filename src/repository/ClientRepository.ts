import prisma from '@/lib/prisma';
import { UserCodeUpdateData } from '@/services/CineseClientService';
import bcrypt from 'bcrypt';

export type ClientData = {
    id: string
    name: string,
    email: string,
    password: string,
    store: string
}

export default class ClientRepository {

    createUser = async (client: ClientData) => {
        const {id, name, email, password, store} = client;

        if(!id || !name || !email || !password || !store){
            throw new Error("Missing fields");
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await prisma.user.create({
            data: {
                id,
                name,
                email,
                store,
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
            },include: {apps: true}
            
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

    setUserCode = async (data: UserCodeUpdateData) => {
        const { code, store, api_address } = data;
        if (!code || !store || !api_address) {
            throw new Error("Missing fields");
        }       

        const user = await prisma.user.update({
            where: {
                store: store
            },
            data: {
                code: code,
                api_address: api_address
            }
        });

        if (!user) {
            return null;
        }
        
        const {hashedPassword: _, ...userWithoutPassword} = user;
        return userWithoutPassword;
    }
    
}