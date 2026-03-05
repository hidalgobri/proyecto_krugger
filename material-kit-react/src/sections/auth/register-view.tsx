import { gql } from 'graphql-tag';
import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { RegisterMutationData, RegisterMutationVars } from 'src/graphql/types/RegisterGraphType';

import { Iconify } from 'src/components/iconify';
// ----------------------------------------------------------------------
const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
`;


export function RegisterView() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
      register({ variables: {username, password}});
  };

  const [register, { loading }] = useMutation<RegisterMutationData,RegisterMutationVars>(REGISTER_MUTATION, {
      onCompleted: (data) => {
         setTimeout(() => {
                router.push('/sign-in');
         }, 2000);
      },
      onError: (e) => {
        setError('Error: ' + e.message);
      }
    });

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="email"
        label="Usuario"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}

      />

      <TextField
        fullWidth
        name="password"
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}

      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleRegister}
      >
        Registrarse
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Registrarse</Typography>
       <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
            <Link component={RouterLink as any} variant="subtitle2" sx={{ ml: 0.5 }} to="/sign-in">Iniciar sesión</Link>
        </Typography>



      </Box>
      {renderForm}
    </>
  );
}
