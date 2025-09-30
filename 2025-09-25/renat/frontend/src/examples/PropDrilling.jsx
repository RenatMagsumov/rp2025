import React, { useState } from "react";

const PropDrilling = () => {
    const [weather, setWeather] = useState("🌞");

    return <Europe weather={weather} />;
};

const Europe = ({ weather }) => {
    return <Estonia weather={weather} />;
};

const Estonia = ({ weather }) => {
    return <Tallinn weather={weather} />;
};

const Tallinn = ({ weather }) => {
    return <div>{weather}</div>;
};

export default PropDrilling;
