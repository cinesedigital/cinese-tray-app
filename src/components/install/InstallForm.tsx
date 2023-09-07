'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface InstallFormProps {
    url: string;
    consumer_key: string;
    store: string;
    register_url: string;
    name: string;
}

function InstallForm({url, consumer_key, store, register_url, name}: InstallFormProps){

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpfCnpj, setCnpjCpf] = useState("");
    const [phone, setPhone] = useState("");
    
    async function registerUser(){
    
        if(email === "" || password === "" || cpfCnpj === "" || phone === "" || !name){
            return;
        }

        const response = await fetch(`${register_url}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password, cpfCnpj, phone, store})
        })
        const res = await response.json();
        console.log(res);
        if(response.status === 201){
            router.push(`${url}/auth.php?response_type=code&consumer_key=${consumer_key}&callback=https://cinese-tray-app.vercel.app/authorize`);
        }
    }

    return (
        <div className="xl:col-span-3 lg:col-span-2 lg:m-10">
            <div>
                <h1 className="text-2xl/tight mb-3">Sign Up</h1>
                <p className="text-sm font-medium leading-relaxed">We are here to help you and we'd love to connect with you.</p>
            </div>

            <div className="space-y-5 mt-10">
                <div>
                    <label className="font-medium text-sm block mb-2" htmlFor="email">Email</label>
                    <input className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full" type="email" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    
                </div>

                <div>
                    <label className="font-medium text-sm block mb-2" htmlFor="pwd">Password</label>
                    <input className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full" type="password" id="pwd" name="pwd" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div>
                    <label className="font-medium text-sm block mb-2" htmlFor="document">Cpf ou Cnpj</label>
                    <input className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full" type="text" id="document" name="pwd" placeholder="Cpf ou Cnpj" onChange={(e) => setCnpjCpf(e.target.value)}/>
                </div>

                <div>
                    <label className="font-medium text-sm block mb-2" htmlFor="telefone">Telefone</label>
                    <input className="text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400 text-sm rounded-lg py-2.5 px-4 w-full" type="text" id="telefone" name="pwd" placeholder="Telefone" onChange={(e) => setPhone(e.target.value)}/>
                </div>

                
            </div>

            <div className="flex flex-wrap items-center justify-between gap-6 mt-8">
                <button className="bg-sky-600 text-white text-sm rounded-lg px-6 py-2.5" onClick={registerUser}>Instalar</button>
                <p className="text-sm font-medium text-gray-500">Already have account? <a href="signin-1.html" className="ms-2 underline text-sky-600">Sign In</a></p>
            </div>
        </div>
        
    )
}

export default InstallForm;