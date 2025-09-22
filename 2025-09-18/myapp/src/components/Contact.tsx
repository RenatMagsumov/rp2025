import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

export default function Contact() {
    return (
        <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
            <Stack spacing={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Contact
                </Typography>

                <TextField label="Your Email" type="email" fullWidth />

                <TextField
                    label="Message"
                    multiline
                    minRows={4}
                    fullWidth
                />

                <Button variant="contained" endIcon={<SendIcon />} color="success">Send</Button>
            </Stack>
        </Container>
    );
}
