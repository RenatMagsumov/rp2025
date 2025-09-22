import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AlarmIcon from '@mui/icons-material/Alarm';
import Dice from "./Dice";


export default function Profile() {
    return (
        <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
            <Box
                sx={{
                    p: 5,
                    border: "1px solid #0c9c4dff",
                    borderRadius: 2,
                    backgroundColor: "#f3a006ff",
                }}
            >
                <Typography variant="h3" gutterBottom>
                    <b>Renat Magsumov</b>
                </Typography>

                <Typography variant="h5" gutterBottom>
                    My hobbies
                </Typography>
                <List>
                    <ListItem><b>Sports</b></ListItem>
                    <ListItem><b>Eating delicious food</b></ListItem>
                    <ListItem><b>Sleeping</b></ListItem>
                </List>

                <Stack spacing={2} mt={2}>
                    <TextField label="Your Email" type="email" fullWidth />
                    <TextField
                        label="Your Message"
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <Button variant="contained" endIcon={<AlarmIcon />} color="info">Contact Me</Button>
                </Stack>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Dice />
            </Box>
        </Container>
    );
}
