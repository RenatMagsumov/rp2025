import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Home() {
    const [nickname, setNickname] = useLocalStorage<string>("nickname", "");

    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
            <Stack spacing={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome {nickname ? nickname : "to My App"}
                </Typography>

                <Typography variant="body1">
                    <b>This page uses localStorage to remember your nickname</b>
                </Typography>

                <TextField
                    label="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    inputProps={{ maxLength: 24 }}
                />

                <Typography variant="body2" color="text.secondary">
                    Refresh the page — and see what happens.
                </Typography>
            </Stack>
        </Container>
    );
}
