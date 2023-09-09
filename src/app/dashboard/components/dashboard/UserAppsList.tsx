'use client'
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
} from "@mui/material";

import { Stack } from "@mui/system";
import { IconBasket } from "@tabler/icons-react";
import BlankCard from "@/app/dashboard/components/shared/BlankCard";
import Image from "next/image";
import {useEffect, useState} from 'react';
import { useSession } from "next-auth/react";

type App = {
  id: number;
  name: string;
  mainCode: string;
  image: string;
  price: number;
}

const UserAppsList = () => {

  const {data:session, status} = useSession();
  const [myapps, setMyApps] = useState<App[]>([]);

  

  useEffect(() => {
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
    getUserData();
  }, []);

  return (
    <Grid container spacing={3}>
      {myapps.map((app, index) => (
        <Grid item xs={12} md={4} lg={3} key={index}>
          <BlankCard>
            <Typography component={Link} href="/">
              <Image
                src={"/assets/images/apps/" + app.image}
                alt="img"
                style={{ width: "100%", height: "250px" }}
              />
            </Typography>
            <Tooltip title="Add To Cart">
              <Fab
                size="small"
                color="primary"
                sx={{ bottom: "75px", right: "15px", position: "absolute" }}
              >
                <IconBasket size="16" />
              </Fab>
            </Tooltip>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Typography variant="h6">{app.name}</Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
                <Stack direction="row" alignItems="center">
                  <Typography variant="h6">${app.price}</Typography>
                </Stack>
                
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserAppsList;
