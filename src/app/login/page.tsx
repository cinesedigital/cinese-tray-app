'use client'
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Logo from "@/components/shared/Logo";

export default function LoginPage() {

    

    
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (e:FormEvent) => {
      
        e.preventDefault();

        await signIn('credentials', {
            ...data,
            redirect:true,
            callbackUrl: '/dashboard',
        });
        
    }

    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
            <Logo width={100} />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Entre com a sua conta
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={loginUser}>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                    Email
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={(e) => setData({...data, email: e.target.value})}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
              
                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Password
                    </label>
                    <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        onChange={(e) => setData({...data, password: e.target.value})}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                 Entrar
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Não tem uma conta?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Crie uma conta clicando aqui
              </a>
            </p>
          </div>
        </div>
      </>
    )
}