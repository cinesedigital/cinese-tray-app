
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {

    //check if admin user already exists
    const user = await prisma.user.findUnique({
        where: {
            email: process.env.ADMIN_EMAIL,
        },
    });

    if (user) {
        return;
    }

    //create admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10);

    await prisma.user.create({
        data: {
            name: 'gabriel.cinese',
            email: process.env.ADMIN_EMAIL,
            hashedPassword: hashedPassword,
            api_address: "https://1225878.commercesuite.com.br/web_api",
            code: "7d5fa6c62d53da7176135b66e69d149b9d65cf75a75d001e458b88f255cf7a03",
            store: "1225878",
            role: 'admin',
        },
    });

}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });