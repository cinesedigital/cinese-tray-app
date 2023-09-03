type PaymentGatewayClient = {
    name: string,
    email: string,
    cpfCnpj: string,
    phone: string,
}

export default class PaymentGatewayClientService {

    async createUser(clientData:PaymentGatewayClient): Promise<PaymentGatewayClient> { 

        const response = await fetch('https://sandbox.asaas.com/api/v3/customers', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                access_token: process.env.PAYMENT_GATEWAY_ACCESS_TOKEN as string
              },
            body: JSON.stringify(clientData)
        });
        
        if(response.status !== 200) {
            throw new Error('Error creating payment gateway user');
        }

        const {name, email, cpfCnpj, phone} = await response.json();

        return {name, email, cpfCnpj, phone};
    }

}