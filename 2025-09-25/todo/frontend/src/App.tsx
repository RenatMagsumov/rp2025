import { useState } from "react";
import Todos from "../components/Todos";
import "./App.css";
import AdminTodos from "../components/AdminTodos";
import { Button, Stack } from "@mui/material";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div style={{ padding: 16 }}>
      <Stack spacing={2}>
        <Todos />
        <Button variant="outlined" onClick={() => setShowAdmin(!showAdmin)}>
          {showAdmin ? "Hide Admin Todos" : "Show Admin Todos"}
        </Button>
        {showAdmin && <AdminTodos />}
      </Stack>
    </div>
  );
}
