import { useState } from "react";
import "./App.css";
import Cats from "../components/Cats";
import Todos from "../components/Todos";
import AdminTodos from "../components/AdminTodos";
import { Button, Stack } from "@mui/material";

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div style={{ padding: 16 }}>
      <Stack spacing={2}>
        <Cats />
        <Todos />
        <Button
          variant="outlined"
          onClick={() => setShowAdmin(!showAdmin)}
        >
          {showAdmin ? "Hide Admin Todos" : "Show Admin Todos"}
        </Button>
        {showAdmin && <AdminTodos />}
      </Stack>
    </div>
  );
}

export default App;
