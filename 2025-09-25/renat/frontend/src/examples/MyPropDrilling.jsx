import React, { useState } from "react";

const MyPropDrilling = () => {
    const [username] = useState("Renat");
    return <Parent username={username} />;
};

const Parent = ({ username }) => {
    return <Child username={username} />;
};

const Child = ({ username }) => {
    return <div>Hello, {username}!</div>;
};

export default MyPropDrilling;
