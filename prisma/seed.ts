
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
            name: 'Cinese Digital',
            email: process.env.ADMIN_EMAIL,
            hashedPassword: hashedPassword,
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