'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {

    const {data:session, status} = useSession();
    useEffect(() => {
        if (status === 'unauthenticated') redirect('/login')
        if (status === 'loading') return;
        if (!session?.user || session?.user.role != "admin") redirect('/login')
    }, [status]);

    if (status === 'loading') return <p>Carregando...</p>
    
    return (
        <>
            <h1>Dashboard</h1>
            <p>Olá {session?.user?.name}</p>
        </>
    )
}