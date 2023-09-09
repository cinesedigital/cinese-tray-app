import prisma from "@/lib/prisma";

type AppData = {
    id: string;
    name: string;
    mainCode: string;
}

type UserAppData = {
    appId: string;
    userId: string;
    assignedAt: Date;
    payment_status: string;
}

type UserData = {
    id: string;
    name: string | null;
    email: string | null;
    hashedPassword: string;
    role: string;
    store: string | null;
    code: string | null;
    api_address: string | null;
    apps: AppData[];
}

export default class AppRepository {

    getAllApps = async (): Promise<AppData[]> => {
        const apps = await prisma.app.findMany();
        return apps;
    }

    getUserApps = async (userId: string): Promise<UserAppData[]> => {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: { apps: true }
        });

        if (!user) {
            return [];
        }

        return user.apps;
    }
}