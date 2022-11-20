import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';

const nombreUsuarioError = 'pq: duplicate key value violates unique constraint "usuarios_nombre_usuario_key"'
const emailError = 'pq: duplicate key value violates unique constraint "usuarios_email_key"'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Venta De Campos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Ingresar() {
  const [error, setError] = React.useState("")
  const router = useRouter()
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const data = new FormData(event.currentTarget);
      const url = apiUrl + "/usuarios"
      const req = await fetch(url, {
        method: "POST",
        body: JSON.stringify(
          {
            nombre_usuario: data.get("nombre_usuario"),
            nombre: data.get("nombre"),
            apellido: data.get("apellido"),
            email: data.get("email"),
            password: data.get("password"),
          }
        )
      })
      const res = await req.json()
      if (!req.ok) {
        setError(res.error)
        console.log("THERE WAS AN ERROR: ", res);
      } else {
        router.push("/")
        setError("")
      }
    } catch (error) {
      console.log("error: ", error);
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box display="flex" gap="12px">
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="Nombre"
              autoFocus
              error={error.includes("Nombre") ? true : false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="apellido"
              label="Apellido"
              name="apellido"
              autoComplete="Apellido"
              autoFocus
              error={error.includes("Apellido") ? true : false}
            />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nombre_usuario"
            label="Nombre de usuario"
            name="nombre_usuario"
            autoComplete="Nombre de usuario"
            autoFocus
            error={error.includes("nombre_usuario") ? true : false}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            error={error.includes("Email") || error.includes("email") ? true : false}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            error={error.includes("Password") ? true : false}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuérdame"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidé mi contraseña
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"No tienes una cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}