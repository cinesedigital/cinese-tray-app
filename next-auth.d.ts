// https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import {JWT, DefalutJWT} from "next-auth/jwt";

declare module "next-auth" {
    interface Session{
        user: {
            id: string;
            role: string;
            name: string;
            email: string;
            hashedPassword: string;
            accessToken: string;
        } & DefaultSession
    }

    interface User extends DefaultUser{
        role: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefalutJWT{
        role: string;
    }
}