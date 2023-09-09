'use client'
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/dashboard/components/forms/theme-elements/CustomTextField";

export default function AuthLogin() {


  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e: FormEvent) => {

    e.preventDefault();
 console.log(data)
    await signIn('credentials', {
      ...data,
      redirect: true,
      callbackUrl: '/dashboard',
    });

  }

  return (
    <>
      <Stack>
        <Box>
          <Typography
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <div className="mt-2">
          <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={(e) => setData({...data, email: e.target.value})}
              className="block w-full rounded-sm border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          </div>
        </Box>
        <Box mt="25px">
          <Typography
            fontWeight={600}
            component="label"
            htmlFor="password"
            onChange={(e) => setData({ ...data, password: "" })}
            mb="5px"
          >
            Password
          </Typography>
          <div className="mt-2">
            <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                onChange={(e) => setData({...data, password: e.target.value})}
                className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            </div>
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={loginUser}
          className="bg-yellow-500 hover:bg-yellow-400 font-semibold"
        >
          Entrar
        </Button>
      </Box>
    </>
  );
}


