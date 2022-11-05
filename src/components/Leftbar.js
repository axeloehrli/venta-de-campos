import { Box } from "@mui/system";
import {Typography} from "@mui/material"

export default function Leftbar() {
  const activeFilters = ["Reconquista", "Alquiler"]
  return (
    <Box
      padding="20px"
      bgcolor="red"
      flex={2}
      display={{xs:"none", md:"block"}}
      maxWidth="300px"
    >
      <Typography
        variant="h5"
      >
        Campos
      </Typography>
    </Box>
  )
}