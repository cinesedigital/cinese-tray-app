//http://localhost:3000/tray/authorize?code=7d5fa6c62d53da7176135b66e69d149b9d65cf75a75d001e458b88f255cf7a03&store=1225878&api_address=https%3A%2F%2F1225878.commercesuite.com.br/web_api
async function AuthAppPage({ searchParams }: any) {
  //imprime o tipo de dado que está sendo recebido
  const { store, code, api_address } = searchParams;
  
  if (!store || !code || !api_address) {
    return (
      <div>
        <h1>AuthAppPage</h1>
        <h2>Missing params</h2>
      </div>
    );
  }
 
  async function updateUser() {
    const response = await fetch(`${api_address}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        consumer_key: process.env.CONSUMER_KEY as string,
        consumer_secret: process.env.CONSUMER_SECRET as string,
        code
      })
    })

    if(!response.ok) {
      return;
    }
    const res = await response.json();

    const update = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({code, store, api_address})
    })
    
    if(update.status != 201) {
      return (
        <div>
          <h1>AuthAppPage</h1>
          <h2>Erro ao autorizar app</h2>
        </div>
      );
    }

    const user = await update.json();

  }

  await updateUser();


  return (
    <div>
      <h1>AuthAppPage</h1>
      <h2>App Autorizado</h2>
    </div>
  );
}

export default AuthAppPage;