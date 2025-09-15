import { useState } from "react";
import "./Dice.css";

export default function Dice() {
    const [value, setValue] = useState<number | null>(null);

    const roll = () => {
        const random = Math.floor(Math.random() * 6) + 1; // 1–6
        setValue(random);
    };

    return (
        <section className="dice-wrap">
            <div className="dice-box">
                <div className="dice-face">{value ?? "—"}</div>
                <button className="dice-btn" onClick={roll}>
                    Roll dice
                </button>
            </div>
        </section>
    );
}
