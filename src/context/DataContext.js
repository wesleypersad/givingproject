import { createContext } from "react";
import { useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // things we want to provide in the context
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [room, setRoom] = useState('payments');

    return (
        <DataContext.Provider value={{
            // the exported data or function go here
            SERVER_URL, room, setRoom
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;