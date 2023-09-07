//?code=2132112312321313abc123edf&store=391250&api_address=http://{URL da loja}/web_api/
function AuthAppPage({ searchParams }: any) {
  //imprime o tipo de dado que está sendo recebido
  const { store, code, api_address } = searchParams;

 
  async function updateUser() {
    const response = await fetch(`${api_address}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        code
      })
    })
    const res = await response.json();
    console.log(res);
    
  }

  updateUser();


  return (
    <div>
      <h1>AuthAppPage</h1>
    </div>
  );
}

export default AuthAppPage;