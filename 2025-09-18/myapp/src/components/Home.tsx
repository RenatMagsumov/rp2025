import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Home() {
    return (
        <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
            <Stack spacing={2}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Renat Magsumov
                </Typography>
                <Typography variant="body1" color="orange">
                    <b>Home page</b>
                </Typography>
                <Typography variant="body2" color="black">
                    You can navigate using the AppBar above.
                </Typography>
            </Stack>
        </Container>
    );
}
