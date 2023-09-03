import ClientRepository from "@/repository/ClientRepository";
import PaymentGatewayClientService, { PaymentGatewayClient } from "./PaymentGatewayClientService";
import { RegisterBody } from "@/app/api/register/route";

export default class CineseClientService {

    constructor(private readonly clientRepository:ClientRepository, private readonly paymentGatewayClientService:PaymentGatewayClientService) {}

    async createUser(clientData:RegisterBody): Promise<PaymentGatewayClient> { 

        const {name, email, password, cpfCnpj, phone} = clientData;

        if(!name || !email || !password || !cpfCnpj || !phone){
            throw new Error("Missing fields");
        }

        const userAlreadyExists = await this.clientRepository.exists(clientData);

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        await this.paymentGatewayClientService.createUser({name, email, cpfCnpj, phone});

        await this.clientRepository.createUser({name, email, password});

        return {name, email, cpfCnpj, phone};
    }
}