import { gql } from 'graphql-tag';
import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client/react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { LoginMutationData, LoginMutationVars } from 'src/graphql/types/LoginGraphType';

import { Iconify } from 'src/components/iconify';
// ----------------------------------------------------------------------
const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;


export function SignInView() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
      login({ variables: {username, password}});
      console.log("aquiii vale");
      console.log(username)
      console.log(password)
  };

  const [login, { loading }] = useMutation<LoginMutationData,LoginMutationVars>(LOGIN_MUTATION, {
      onCompleted: (data) => {
        localStorage.setItem('token', data.login.token);
        router.push('/dashboard');
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

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        ¿Olvidaste tu contraseña?
      </Link>

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
        onClick={handleSignIn}
      >
        Sign in
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
        <Typography variant="h5">Sign in</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>
      {renderForm}
    </>
  );
}
