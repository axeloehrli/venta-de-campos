import { Box } from "@mui/system";
import { Typography } from "@mui/material"
import ActiveFilters from "./ActiveFilters";
import FiltersAccordion from "./Accordion";

export default function Leftbar() {
  return (
    <Box
      padding="20px"
      flex={2}
      display={{ xs: "none", md: "block" }}
      maxWidth="300px"
      position="sticky"
      top="0"
      maxHeight="100vh"
      overflow="scroll"
      sx={{float:"left"}}
      >
      <Typography
        variant="h5"
      >
        <ActiveFilters />
        <FiltersAccordion />
      </Typography>
    </Box>
  )
}