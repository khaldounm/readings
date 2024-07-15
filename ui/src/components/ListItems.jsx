import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AddBoxIcon color="primary"/>
      </ListItemIcon>
      <ListItemText primary="Create user" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <RecordVoiceOverIcon color="success" />
      </ListItemIcon>
      <ListItemText primary="Record user" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
  </React.Fragment>
);