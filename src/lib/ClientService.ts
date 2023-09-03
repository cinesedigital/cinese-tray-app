import CineseClientService from "@/services/CineseClientService";
import ClientRepository from '@/repository/ClientRepository';
import PaymentGatewayClientService from '@/services/PaymentGatewayClientService';

const globalForClientService = global as unknown as { clientService: CineseClientService };

export const cineseClientService = globalForClientService.clientService || new CineseClientService(new ClientRepository(), new PaymentGatewayClientService());

if (process.env.NODE_ENV !== "production") globalForClientService.clientService = cineseClientService;

export default cineseClientService;