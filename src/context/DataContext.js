import { createContext } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // things we want to provide in the context
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    return (
        <DataContext.Provider value={{
            // the exported data or function go here
            SERVER_URL
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;