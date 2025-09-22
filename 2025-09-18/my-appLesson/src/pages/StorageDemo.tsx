import * as React from 'react'
import { Box, Typography, Paper, Stack, TextField } from '@mui/material'
import { useLocalStorage } from '../hooks/UseLocalStorage'

export default function StorageDemo() {
    const [note, setNote] = useLocalStorage<string>('note', '')

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                LocalStorage Demo
            </Typography>

            <Paper sx={{ p: 2 }}>
                <Stack spacing={2}>
                    <TextField
                        label="Note (saved in LocalStorage)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        fullWidth
                    />
                    <Typography variant="body2">
                        Current value: {note || '—'}
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    )
}
