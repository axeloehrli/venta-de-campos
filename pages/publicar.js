import Navbar from "../src/components/Navbar";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import Provincias from "../src/Provincias"
import { useRouter } from "next/router";
import Cookies from "js-cookie"
import { useState } from "react";

export default function CrearCampo() {
  const [error, setError] = useState("")

  const router = useRouter()
  const handleSubmit = async e => {
    e.preventDefault()
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const userID = parseInt(Cookies.get("userID"))
    const data = new FormData(e.currentTarget);
    const url = apiUrl + "/campos"
    const token = Cookies.get("camposToken")
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
    console.log(res)
    if (req.ok) {
      router.push("/")
    } else {
      setError(res.error)
    }
    if (req.status == 401) {
      router.push("/ingresar")
    }
  }
  console.log(error);
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
              error={error.includes("Titulo")}
              helperText={error.includes("Titulo") && "Ingrese un título válido"}
            />
            <TextField
              required
              fullWidth
              id="Descripción"
              label="Descripción"
              name="descripcion"
              multiline
              rows={4}
              error={error.includes("Descripcion")}
              helperText={error.includes("Descripcion") && "Ingrese una descripción valida"}
            />
            <TextField
              select
              autoFocus
              fullWidth
              id="tipo"
              label="Tipo"
              name="tipo"
              defaultValue="Ganadero"
              error={error.includes("Tipo")}
              helperText={error.includes("Tipo") && "Ingrese un tipo de campo válido"}
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
              error={error.includes("Hectareas")}
              helperText={error.includes("Hectareas") && "Ingrese un número de hectareas válido"}
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
              error={error.includes("PrecioPorHectarea")}
              helperText={error.includes("PrecioPorHectarea") && "Ingrese un precio por hectarea válido"}
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
              error={error.includes("Ciudad")}
              helperText={error.includes("Ciudad") && "Ingrese una ciudad válida"}
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
    const cookies = context.req.cookies
    const token = cookies.camposToken
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const reqUrl = apiUrl + "/verify"

    if (!token) {
      return {
        redirect: {
          destination: "/ingresar"
        }
      }
    }

    const req = await fetch(reqUrl, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!req.ok) {
      return {
        redirect: {
          destination: "/ingresar"
        }
      }
    }

    return {
      props: {}
    }
  } catch (error) {
    console.log(error);
  }
}