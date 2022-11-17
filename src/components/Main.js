import TuneIcon from "@mui/icons-material/Tune";
import { Fab, Grid, Pagination, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import FieldCard from "./FieldCard";
import FiltersDialog from "./FiltersDialog";

export default function Main({ campos }) {
  const router = useRouter()
  const numPages = Math.ceil(campos.count / 9)
  console.log("NUM PAGES: ", numPages)
  return (
    <Box
      flex={5}
      display="flex"
      flexDirection="column"
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        padding="16px"
      >
        {
          campos.list.length == 0 &&
          <Container>
            <Typography variant="h6" marginTop="32px">
              No hemos encontrado campos con esas características, prueba eliminando un filtro.
            </Typography>
          </Container>
        }
        {campos.list.length != 0 && campos.list.map((campo, index) => (
          <Grid
            xs={12}
            sm={6}
            lg={4}
            xl={3}
            item
            key={index}
            minWidth="250px"
          >
            <FieldCard campo={campo} />
          </Grid>
        ))}
        <FiltersDialog />

      </Grid>
      <Pagination
        page={parseInt(router.query["page_id"]) || 1}
        count={numPages}
        onChange={(event, value) => {
          router.query["page_id"] = value
          router.push(router)
        }}
        color="primary"
        sx={{ margin: "0 auto", paddingY: "30px" }}
      />
    </Box>
  )
}