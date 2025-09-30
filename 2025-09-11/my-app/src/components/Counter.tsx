import { useState } from "react";
import "../App.css";

function Counter() {
    const [count, setCount] = useState(0);

    // функция изменения счётчика
    const change = (delta: number) => setCount((c) => c + delta);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            <h1>Vite + React + Renat</h1>
            <h2>Count: {count}</h2>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                {[100, 50, 25, 1].map((n) => (
                    <button key={"plus" + n} onClick={() => change(n)}>+{n}</button>
                ))}
                {[-1, -25, -50, -100].map((n) => (
                    <button key={"minus" + n} onClick={() => change(n)}>{n}</button>
                ))}
            </div>
        </div>
    );
}

export default Counter;
