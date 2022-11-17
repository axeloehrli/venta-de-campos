import styled from "@emotion/styled";
import PublicIcon from '@mui/icons-material/Public';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, InputBase, Badge, Avatar, Menu, MenuItem, Button, IconButton, Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Provincias from "../Provincias"
import { useRouter } from "next/router";
import Link from "next/link";
import Ingresar from "../../pages/ingresar";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
})

const Search = styled("div")(({ theme }) => ({
  margin: "0 24px",
  width: "50%",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
}))

const Icons = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  gap: "20px",

}))

const NotLoggedMenu = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("md")]: {
    display: "none"
  }
}))

const UserBox = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("md")]: {
    display: "none"
  }
}))


export default function Navbar() {
  const router = useRouter()
  const verifyToken = async () => {
    try {
      const verifyTokenUrl = "http://localhost:8000/verify"
      const token = localStorage.getItem("camposToken")
      const req = await fetch(verifyTokenUrl, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!req.ok) {
        router.push("/ingresar")
        const res = await req.json()
        console.log(res);
        return
      }
      router.push("/publicar")

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AppBar position="sticky" color="background">
      <StyledToolbar>
        <Typography
          variant="h6"
          component="h1"
          sx={{
            fontWeight: "bold",
            display: { xs: "none", sm: "block" }
          }}
        >
          Venta de Campos
        </Typography>
        <PublicIcon
          sx={{
            display: { xs: "block", sm: "none" }
          }}
        />
        <Search>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={Provincias}
            renderInput={(params) => <TextField {...params} label="Provincia" />}
            value={router.query.provincia || null}
            onChange={(_, value) => {
              if (value == null) {
                const { provincia, ...routerQuery } = router.query;
                router.replace({
                  query: { ...routerQuery },
                });
                return
              }
              router.push("?provincia=" + value)
            }}
          />
        </Search>
        <Icons>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              verifyToken()
            }}
          >
            Publicar
          </Button>
        </Icons>
        {/* <UserBox
        >
          <Avatar
            sx={{
              width: 30,
              height: 30
            }}
            onClick={() => setMenuOpen(true)}
          />
          <Typography
            variant="span"
          >
            John
          </Typography>
        </UserBox> */}
        {/*         <NotLoggedMenu onClick={() => setMenuOpen(true)}>
          <IconButton aria-label="menu" color="primary">
            <MenuIcon />
          </IconButton>
        </NotLoggedMenu>
        <Menu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={() => setMenuOpen(false)}>Ingresar</MenuItem>
          <MenuItem onClick={() => setMenuOpen(false)}>Registrarme</MenuItem>
        </Menu> */}
      </StyledToolbar>

    </AppBar>
  )
}

