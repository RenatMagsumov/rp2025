import "./App.css";
import Cats from "../components/Cats";
import Todos from "../components/Todos";
import AdminTodos from "../components/AdminTodos";

function App() {
  return (
    <>
      <Cats />
      <Todos />
      <AdminTodos />
    </>
  );
}

export default App;
