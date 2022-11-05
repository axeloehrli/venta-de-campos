import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from "@mui/icons-material/Tune";
import Slide from '@mui/material/Slide';
import { Accordion, Box, Fab } from '@mui/material';
import SimpleAccordion from './Accordion';
import ActiveFilters from './ActiveFilters';
import { FiltersContext } from '../../pages';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function FiltersDialog() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const activeFilters = React.useContext(FiltersContext)
  React.useEffect(() => {
    handleClose()
}, [activeFilters])

  return (
    <div>
      <Box
        display={{ xs: "block", md: "none" }}
        onClick={handleClickOpen}
      >
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          <TuneIcon />
        </Fab>
      </Box>
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
        <SimpleAccordion />
      </Dialog>
    </div>
  );
}