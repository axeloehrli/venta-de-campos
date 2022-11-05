import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FiltersContext } from '../../pages';
import Provincias from '../Provincias'
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { removeQueryParam } from './ActiveFilters';


function containsFilter(filtersArray, filterName) {
    return filtersArray.some(e => e.name == filterName)
}
export default function SimpleAccordion() {

    const router = useRouter()
    return (
        <div>
            {
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
            }
            {
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant='h6'>Aptitud</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={router.query.aptitud || null}
                                onChange={(_, newValue) => {
                                    router.query.aptitud = newValue
                                    router.push(router)
                                }}
                            >
                                <FormControlLabel value="Ganadero" control={<Radio />} label="Ganadero" />
                                <FormControlLabel value="Agricola" control={<Radio />} label="Agricola" />
                            </RadioGroup>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            }
        </div>
    );
}
