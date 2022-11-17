import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Provincias from '../Provincias'
import { Autocomplete, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';

export default function FiltersAccordion() {
    const router = useRouter()
    const [precioPorHectareaMin, setPrecioPorHectareaMin] = React.useState(router.query["precio_por_hectarea_min"])
    const [precioPorHectareaMax, setPrecioPorHectareaMax] = React.useState(router.query["precio_por_hectarea_max"])

    const [hectareasMin, setHectareasMin] = React.useState(router.query["hectareas_min"])
    const [hectareasMax, setHectareasMax] = React.useState(router.query["hectareas_max"])

    return (
        <div>
            <Accordion disableGutters>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant='h6'>Provincia</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={Provincias}
                        value={router.query.provincia || null}
                        onChange={(_, newValue) => {
                            if (!newValue) return
                            router.query.provincia = newValue
                            router.push(router)
                        }}
                        renderInput={(params) => <TextField {...params} label="Provincia" />}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant='h6'>Tipo</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={router.query.tipo || null}
                            onChange={(_, newValue) => {
                                router.query.tipo = newValue
                                router.push(router)
                            }}
                        >
                            <FormControlLabel value="Ganadero" control={<Radio />} label="Ganadero" />
                            <FormControlLabel value="Agrícola" control={<Radio />} label="Agrícola" />
                            <FormControlLabel value="Mixto" control={<Radio />} label="Mixto" />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant='h6'>Precio por hectárea</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        sx={{ display: "flex", gap: "16px" }}
                    >
                        <TextField
                            sx={{ flex: "1" }}
                            id="standard-number"
                            label="Mínimo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={router.query["precio_por_hectarea_min"] || null}
                            onChange={event => {
                                setPrecioPorHectareaMin(event.target.value)
                            }}
                        />
                        <TextField
                            sx={{ flex: "1" }}
                            id="standard-number"
                            label="Máximo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={router.query["precio_por_hectarea_max"] || null}
                            onChange={event => {
                                setPrecioPorHectareaMax(event.target.value)
                            }}
                        />
                    </Box>
                    <Button
                        variant='contained'
                        sx={{ display: "inline-block", marginY: "12px", width: "100%" }}
                        onClick={() => {
                            if (precioPorHectareaMin != null) {
                                router.query["precio_por_hectarea_min"] = precioPorHectareaMin
                            }
                            if (precioPorHectareaMax != null) {
                                router.query["precio_por_hectarea_max"] = precioPorHectareaMax
                            }
                            router.push(router)
                        }}
                    >
                        Aplicar
                    </Button>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant='h6'>Hectáreas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        sx={{ display: "flex", gap: "16px" }}
                    >
                        <TextField
                            sx={{flex:"1"}}
                            id="standard-number"
                            label="Mínimo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={router.query["hectareas_min"] || null}
                            onChange={event => {
                                setHectareasMin(event.target.value)
                            }}
                        />
                        <TextField
                            sx={{flex:"1"}}
                            id="standard-number"
                            label="Máximo"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={router.query["hectareas_max"] || null}
                            onChange={event => {
                                setHectareasMax(event.target.value)
                            }}
                        />
                    </Box>
                    <Button
                        variant='contained'
                        sx={{ display: "inline-block", marginY: "12px", width: "100%" }}
                        onClick={() => {
                            if (hectareasMin != null) {
                                router.query["hectareas_min"] = hectareasMin
                            }
                            if (hectareasMax != null) {
                                router.query["hectareas_max"] = hectareasMax
                            }
                            router.push(router)
                        }}
                    >
                        Aplicar
                    </Button>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
