export type PaymentGatewayClient = {
    name: string,
    email: string,
    cpfCnpj: string,
    phone: string,
}

export type PaymentGatewayClientResponse = {
    id: string,
    name: string,
    email: string,
    cpfCnpj: string,
    phone: string,
}

export default class PaymentGatewayClientService {

    async createUser(clientData:PaymentGatewayClient): Promise<PaymentGatewayClientResponse> { 

        const response = await fetch('https://sandbox.asaas.com/api/v3/customers', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                access_token: `$${process.env.PAYMENT_GATEWAY_ACCESS_TOKEN as string}`
              },
            body: JSON.stringify(clientData)
        });

        if(response.status !== 200) {
            throw new Error('Error creating payment gateway user');
        }

        const {id, name, email, cpfCnpj, phone} = await response.json();

        return {id, name, email, cpfCnpj, phone};
    }

    async deleteUserById(id: string) {
        const response = await fetch(`https://sandbox.asaas.com/api/v3/customers/${id}`, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                access_token: `$${process.env.PAYMENT_GATEWAY_ACCESS_TOKEN as string}`
              }
        });

        if(response.status !== 200) {
            throw new Error('Error deleting payment gateway user');
        }

        const res = await response.json();

        return res;
    }

    getAllUsers = async () => {
        const response = await fetch('https://sandbox.asaas.com/api/v3/customers', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                access_token: `$${process.env.PAYMENT_GATEWAY_ACCESS_TOKEN as string}`
              }
        });

        if(response.status !== 200) {
            throw new Error('Error getting payment gateway users');
        }

        const res = await response.json();

        return res;
    }

}