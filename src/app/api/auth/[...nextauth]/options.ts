import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                password: { label: "Password", type: "password" },
                email: { label: "Email", type: "email" }
            },
            async authorize(credentials) {

                if(!credentials?.email || !credentials?.password){
                    return null;
                }

                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(credentials)
                });

                const user = await res.json();
                console.log(user)
                if(!user){
                    return null;
                }

                return user;
            }
        })
        
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user};
        },
        // to use the role in client components
        async session({session, token}) {
           session.user = token as any
           return session
        }
    },
}