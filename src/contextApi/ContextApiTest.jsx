import { Children, createContext, useState } from "react";

export const ContextApiTest = createContext();

export const ContextProvider = ({ Children }) => {
    const getToken = localStorage.getItem("JWT_TOKEN")
        ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
        : null;

        const [token, setToken] = useState(getToken);

        const sendData = {
            token,
            setToken,
        };

        // Provide the context value to child components 
        // using ContextApiTest.Provider
        // and render the children inside it
        // This allows any child component to access the context value 
        return <ContextApiTest.Provider value={sendData}>{Children}</ContextApiTest.Provider>
}