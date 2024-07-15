import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { UsersChart, UsersCard } from '../components'
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const CreateUser = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <UsersChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <UsersCard />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField id="outlined-basic" label="User ID" variant="outlined" sx={{ mb: 2 }}/>
          <Button variant="contained" endIcon={<AddCircleIcon />} size="large">
            Add user
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};