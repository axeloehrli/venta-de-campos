import TuneIcon from "@mui/icons-material/Tune";
import { Fab, Grid } from "@mui/material";
import { Box } from "@mui/system";
import FieldCard from "./FieldCard";
import FiltersDialog from "./FiltersDialog";

export default function Main() {
  return (
    <Grid
      flex={5}
      container
      spacing={{ xs: 2, md: 3 }}
      padding="16px"
    >
      {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
        <Grid
          xs={12}
          sm={6}
          lg={4}
          xl={3}
          item
          key={index}
          minWidth="250px"
        >
          <FieldCard />
        </Grid>
      ))}
      <FiltersDialog/>
    </Grid>
  )
}