'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {

    const {data:session, status} = useSession();
    useEffect(() => {
        if (status === 'unauthenticated') redirect('/login')
        if (status === 'loading') return;
        if (!session?.user) redirect('/login');
        
    }, [status]);

    if (status === 'loading') return <p>Carregando...</p>
    
    return (
        <section className="min-h-screen">
            <h1>Dashboard</h1>
        </section>
    )
}