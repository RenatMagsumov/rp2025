import React, { useState, createContext, useContext } from "react";

const UserContext = createContext(null);

const MyContext = () => {
    const [username] = useState("Renat");

    return (
        <UserContext.Provider value={username}>
            <Parent />
        </UserContext.Provider>
    );
};

const Parent = () => {
    return <Child />;
};

const Child = () => {
    const username = useContext(UserContext);
    return <div>Hello, {username}!</div>;
};

export default MyContext;
