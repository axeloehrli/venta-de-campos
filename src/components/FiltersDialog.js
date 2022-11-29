import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from "@mui/icons-material/Tune";
import Slide from '@mui/material/Slide';
import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import FiltersAccordion from './Accordion';
import ActiveFilters from './ActiveFilters';
import { FiltersContext } from '../../pages';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function FiltersDialog({open, handleClose}) {


  const activeFilters = React.useContext(FiltersContext)
  React.useEffect(() => {
    handleClose()
}, [activeFilters])

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Filtros
            </Typography>
          </Toolbar>
        </AppBar>
        <ActiveFilters />
        <FiltersAccordion />
      </Dialog>
    </div>
  );
}
