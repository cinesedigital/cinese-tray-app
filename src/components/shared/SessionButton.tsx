'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function SessionButton(){

    const {data:session, status} = useSession();
    useEffect(() => {
        if (status === 'unauthenticated') redirect('/login')
        if (status === 'loading') return;
        if (!session?.user) redirect('/login');
        
    }, [status]);

    if (status === 'loading') return <p>Carregando...</p>

    return (
        <div>
        <p>Olá {session?.user?.name}</p>
        </div>
    )
}

export default SessionButton;
