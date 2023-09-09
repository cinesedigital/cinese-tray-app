import ClientRepository from "@/repository/ClientRepository";
import PaymentGatewayClientService, { PaymentGatewayClientResponse } from "./PaymentGatewayClientService";
import { RegisterBody } from "@/app/api/user/route";

export interface UserCodeUpdateData {
    code: string,
    store: string,
    api_address: string
}


export default class CineseClientService {

    constructor(private readonly clientRepository:ClientRepository, private readonly paymentGatewayClientService:PaymentGatewayClientService) {}

    async createUser(clientData:RegisterBody): Promise<PaymentGatewayClientResponse> { 

        const {name, email, password, cpfCnpj, phone, store} = clientData;

        if(!name || !email || !password || !cpfCnpj || !phone || !store){
            throw new Error("Missing fields");
        }

        const userAlreadyExists = await this.clientRepository.exists(email);

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const client = await this.paymentGatewayClientService.createUser({name, email, cpfCnpj, phone});

        await this.clientRepository.createUser({id: client.id, name, email, password, store});

        return {id: client.id, name, email, cpfCnpj, phone};
    }

    async getUserByEmail(email: string) {

        if(!email){
           return null;
        }

        const user = await this.clientRepository.getUserByEmail(email);
        return user;
    }

    async getUserById(id: string) {    
        if(!id){
        return null;
        }

        const user = await this.clientRepository.getUserById(id);
        return user;
    }

    async getAllUsers() {
        const users = await this.clientRepository.getAllUsers();
        return users;
    }

    async deleteUserById(id: string) {
        if(!id){
            return null
        }
        const client = await this.clientRepository.getUserById(id);
        if (!client) {
            throw new Error("User not found");
        }
        await this.paymentGatewayClientService.deleteUserById(id);
        await this.clientRepository.deleteUserById(id);
        return client;
    }

    async setUserCode({ code, store, api_address }: UserCodeUpdateData) {

        if (!code || !store || !api_address) {
            throw new Error("Missing fields");
        }
        const user = await this.clientRepository.setUserCode({ code, store, api_address });
        return user;
    }
}