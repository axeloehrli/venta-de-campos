import { useEffect } from "react";
import Navbar from "../src/components/Navbar";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup } from "@mui/material";
import Provincias from "../src/Provincias"
import { useRouter } from "next/router";

export default function CrearCampo() {
  const router = useRouter()
  const handleSubmit = async e => {
    e.preventDefault()
    const userID = parseInt(localStorage.getItem("userID"))
    const data = new FormData(e.currentTarget);
    const url = "http://localhost:8000/campos"
    const token = localStorage.getItem("camposToken")
    const req = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id_usuario: userID,
        titulo: data.get("titulo"),
        descripcion: data.get("descripcion"),
        tipo: data.get("tipo"),
        hectareas: parseInt(data.get("hectareas")),
        precio_por_hectarea: parseInt(data.get("precio_por_hectarea")),
        ciudad: data.get("ciudad"),
        provincia: data.get("provincia"),
      })
    })
    const res = await req.json()
    console.log(res);

    if (req.ok) {
      router.push("/")
    }

    if (req.status == 401) {
      router.push("/ingresar")
    }
  }

  useEffect(() => {
    try {
      verifyToken()
    } catch (error) {

    }
  }, [])
  return (
    <>

      <Navbar />
      <Container>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box display="flex" gap="12px" flexDirection="column">
            <TextField
              margin="normal"
              required
              fullWidth
              id="titulo"
              label="Título"
              name="titulo"
              autoComplete="Título"
              autoFocus
            />
            <TextField
              required
              fullWidth
              id="Descripción"
              label="Descripción"
              name="descripcion"
              multiline
              rows={4}
            />
            <TextField
              select
              autoFocus
              fullWidth
              id="tipo"
              label="Tipo"
              name="tipo"
              defaultValue="Ganadero"
            >
              {["Ganadero", "Agricola", "Mixto"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              id="hectareas"
              label="Número de hectáreas"
              name="hectareas"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              id="precio_por_hectarea"
              label="Precio por hectárea"
              name="precio_por_hectarea"
              InputProps={{
                startAdornment: <InputAdornment position="start">U$D</InputAdornment>,
              }}
              autoFocus
            />
            <TextField
              select
              autoFocus
              fullWidth
              id="provincia"
              label="Provincia"
              name="provincia"
              defaultValue="Buenos Aires"
              sx={{
                maxHeight: "50px"
              }}
            >
              {Provincias.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              id="ciudad"
              label="Ciudad"
              name="ciudad"
              autoComplete="Ciudad"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Publicar
            </Button>
          </Box>
        </Box>
      </Container >
    </>
  )
}

export const getServerSideProps = async (context) => {
  try {

    return {
      props: {}
    }
  } catch (error) {
    console.log(error);
    return {
      props: { error: true }
    }
  }
}