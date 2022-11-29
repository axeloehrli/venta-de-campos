import styled from "@emotion/styled";
import PublicIcon from '@mui/icons-material/Public';

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Box from "@mui/system/Box"
import Provincias from "../Provincias"
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import FiltersDialog from "./FiltersDialog";
import { useState } from "react";
import { ButtonBase } from "@mui/material";
import FilterIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';

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


export default function Navbar({ showFilterAndOrder }) {
  const [openFiltersDialog, setopenFiltersDialog] = useState(false)
  const handleFiltersDialogOpen = () => {
    setopenFiltersDialog(true)
  }
  const handleFiltersDialogClose = () => {
    setopenFiltersDialog(false)
  }
  const router = useRouter()
  return (
    <>
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
                router.push("/publicar")
              }}
            >
              Publicar
            </Button>
          </Icons>
        </StyledToolbar>
        {showFilterAndOrder &&
          <Box
            display={{ xs: "flex", md: "none" }}
            bgcolor="#51a331"
            color="white"
          >
            <Divider />
            <Box display="flex" flex={1}>
              <ButtonBase 
              sx={{ flex: 1, padding: "6px" }} 
              onClick={handleFiltersDialogOpen}
              >
                <FilterIcon sx={{fontSize:"18px"}}/>
                <Typography fontWeight="bold" paddingLeft="10px">
                  Filtrar
                </Typography>
              </ButtonBase>
            </Box>
            <Box display="flex" flex={1}>
              <ButtonBase sx={{ flex: 1, padding: "6px" }} >
                <SortIcon sx={{fontSize:"18px"}}/>
                <Typography fontWeight="bold" paddingLeft="10px">
                  Ordenar
                </Typography>
              </ButtonBase>
            </Box>
          </Box>
        }
      </AppBar>
      <FiltersDialog open={openFiltersDialog} handleClose={handleFiltersDialogClose} />
    </>
  )
}

