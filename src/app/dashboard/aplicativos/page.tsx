'use client'
import {useState} from 'react';
import {useSession} from 'next-auth/react';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/dashboard/components/container/PageContainer';
import UserAppsList from '@/app/dashboard/components/dashboard/UserAppsList';

const Dashboard = () => {

  const {data:session, status} = useSession();
  const [myapps, setMyApps] = useState([]);

  async function getUserData() {
    
    if (!session?.user) return;
    const response = await fetch(`/api/user/${session.user.id}/apps`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session.user.accessToken as string
        },
    })

    

    const data = await response.json();
   
    setMyApps(data);
}

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserAppsList />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
