import styled from "@emotion/styled";
import PublicIcon from '@mui/icons-material/Public';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, InputBase, Badge, Avatar, Menu, MenuItem, Button, IconButton, Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

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
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
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
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <AppBar position="sticky" color="background">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            display: { xs: "none", sm: "block" }
          }}
        >
          Campos
        </Typography>
        <PublicIcon
          sx={{
            display: { xs: "block", sm: "none" }
          }}
        />
        <Search>
          {/* <InputBase
            placeholder="Search"
          /> */}
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={campos}
            renderInput={(params) => <TextField {...params} label="Buscar" />}
          />
        </Search>
        <Icons>
          <Button
            href="#login"
            color="primary"
            variant="outlined"
          >
            Ingresar
          </Button>
          <Button
            variant="contained"
            color="primary"
          >
            Registrarme
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
        <NotLoggedMenu onClick={() => setMenuOpen(true)}>
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
        </Menu>
      </StyledToolbar>

    </AppBar>
  )
}

const campos = [
  { label: 'Reconquista, Santa Fe', year: 1994 },
  { label: 'Paraná, Entre Ríos', year: 1972 },
  { label: 'Rawson, Chubut', year: 1974 },
  { label: 'Caballito, Buenos Aires', year: 2008 },
  { label: 'Santiago del Estero', year: 1957 },
];