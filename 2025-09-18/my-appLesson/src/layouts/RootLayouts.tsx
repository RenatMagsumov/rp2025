import * as React from 'react'
import { Link, Outlet } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function RootLayout() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        RP-2025 Renat Magsumov
                    </Typography>

                    {/* Link из react-router-dom (не MUI Link) */}
                    <Stack direction="row" spacing={1}>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/profile">Profile</Button>
                        <Button color="inherit" component={Link} to="/card">Card</Button>
                        <Button color="inherit" component={Link} to="/storage-demo">Storage</Button>

                    </Stack>
                </Toolbar>
            </AppBar>

            <Container sx={{ py: 4 }}>
                <Outlet />
            </Container>
        </Box>
    )
}
