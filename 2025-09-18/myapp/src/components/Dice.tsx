import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Dice() {
    const [value, setValue] = useState<number | null>(null);

    const roll = () => {
        const n = Math.floor(Math.random() * 6) + 1; // 1–6
        setValue(n);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Stack spacing={2} alignItems="center">
                <Typography variant="h4" component="h1">Dice</Typography>

                <Box
                    sx={{
                        width: 120,
                        height: 120,
                        borderRadius: 2,
                        border: "2px solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "background.paper",
                    }}
                >
                    <Typography variant="h2">{value ?? "—"}</Typography>
                </Box>

                <Button variant="contained" onClick={roll}>
                    Roll dice
                </Button>

                <Typography variant="body2" color="text.secondary">
                    Click the button to get a random number (1–6).
                </Typography>
            </Stack>
        </Container>
    );
}
