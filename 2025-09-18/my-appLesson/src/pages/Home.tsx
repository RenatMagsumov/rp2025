import * as React from 'react'
import { Box, Typography, Stack, Button, TextField, Paper } from '@mui/material'

export default function Home() {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>Home</Typography>

            <Stack spacing={2}>
                <Paper sx={{ p: 2 }}>
                    <Typography gutterBottom>
                        Hello
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField label="Search" fullWidth />
                        <Button variant="contained">Search</Button>
                    </Stack>
                </Paper>

                <Stack direction="row" spacing={2}>
                    <Button variant="contained">Button 1</Button>
                    <Button variant="outlined">Button 2</Button>
                </Stack>
            </Stack>
        </Box>
    )
}
