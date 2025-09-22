import * as React from 'react'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
} from '@mui/material'

type Item = { id: number; title: string; text: string }

export default function CardPage() {
    const items: Item[] = [
        { id: 1, title: 'Card 1', text: 'To Card 1' },
        { id: 2, title: 'Card 2', text: 'To Card 2' },
        { id: 3, title: 'Card 3', text: 'To Card 3' },
    ]

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Card
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                {items.map((it) => (
                    <Card key={it.id} sx={{ width: 300 }}>
                        <CardContent>
                            <Typography variant="h6">{it.title}</Typography>
                            <Typography variant="body2">{it.text}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">More Details</Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}
