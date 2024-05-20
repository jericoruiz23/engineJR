import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, Route } from 'react-router-dom';
import { MdContentPasteSearch } from "react-icons/md";
import { IoDocumentAttachOutline } from "react-icons/io5";


export const mainListItems = (
    <React.Fragment>
        <ListItemButton button component={Link} to="/dashboard">
            <ListItemIcon>
                <MdContentPasteSearch style={{ fontSize: '1.25em' }} />
            </ListItemIcon>
            <ListItemText primary="Buscador" />
        </ListItemButton>
        <ListItemButton button component={Link} to="/documents">
            <ListItemIcon>
                <IoDocumentAttachOutline style={{ fontSize: '1.25em' }} />
            </ListItemIcon>
            <ListItemText primary="Carga" />
        </ListItemButton>
        <ListItemButton button component={Link} to="/dataLoader">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Documentos" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Cuenta" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Reportes" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);