
//http://localhost:3000/tray/instalar?store=1225878&adm_user=gabriel.cinese&user_id=25&url=https%3A%2F%2F1225878.commercesuite.com.br
import InstallForm from "@/components/install/InstallForm";

function InstallAppPage({searchParams}: any){
    //imprime o tipo de dado que está sendo recebido
    const {url, adm_user, store} = searchParams;
    const consumer_key = process.env.CONSUMER_KEY as string;
    const register_url = process.env.NEXTAUTH_URL as string;    
    
    return (
      <>
      <section className="h-screen flex items-center justify-center bg-no-repeat inset-0 bg-cover">
        <div className="container 2xl:px-80 xl:px-52">
            <div className="bg-white rounded-lg p-5" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <div className="grid xl:grid-cols-5 lg:grid-cols-3 gap-6">

                    <div className="xl:col-span-2 lg:col-span-1 hidden lg:block">
                        <div className="bg-sky-600 text-white rounded-lg flex flex-col justify-between gap-10 h-full w-full p-7">

                            <span className="font-semibold tracking-widest uppercase">TechAuth </span>

                            <div>
                                <h1 className="text-3xl/tight mb-4">We're here to help you level up.</h1>
                                <p className="text-gray-200 font-normal leading-relaxed">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>

                            <div>
                                <div className="bg-sky-700/50 rounded-lg p-5">
                                    <p className="text-gray-200 text-sm font-normal leading mb-4">There are many variations of passages of Lorem Ipsum available, but the majority in some form</p>
                                    <div className="flex items-center gap-4">
                                        <img src="assets/images/user.png" alt="" className="h-12 rounded-lg" />
                                        <div>
                                            <p className="font-normal">Timson K</p>
                                            <span className="text-xs font-normal">Freelancer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <InstallForm url={url} consumer_key={consumer_key} store={store} register_url={register_url} name={adm_user}/>

                </div>
            </div>
        </div>
        
    </section>
      </>
      )
}

export default InstallAppPage;