import * as React from 'react'
import { Box, Typography, Paper, List, ListItem, ListItemText, Stack, TextField, Button } from '@mui/material'

export default function Profile() {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>Profile</Typography>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Name</Typography>
                <Typography>Your Name</Typography>
            </Paper>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Hobby</Typography>
                <List>
                    <ListItem><ListItemText primary="Photos" /></ListItem>
                    <ListItem><ListItemText primary="Videos" /></ListItem>
                    <ListItem><ListItemText primary="Links" /></ListItem>
                </List>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Contact me</Typography>
                <Stack spacing={2}>
                    <TextField label="Your email" type="email" fullWidth />
                    <TextField label="Message" multiline minRows={3} fullWidth />
                    <Button variant="contained" size="large">Send</Button>
                </Stack>
            </Paper>
        </Box>
    )
}
