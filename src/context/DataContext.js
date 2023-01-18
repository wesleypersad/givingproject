import { createContext } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // things we want to provide in the context
    const DB_URL = process.env.REACT_APP_DB_URL;
    const TWILIO_URL = process.env.REACT_APP_TWILIO_URL;
    const SENDGRID_URL = process.env.REACT_APP_SENDGRID_URL;
    const CHARITY_URL = process.env.REACT_APP_CHARITY_URL;
    const BLOG_URL = process.env.REACT_APP_BLOG_URL;
    const USER_URL = process.env.REACT_APP_USER_URL;
    const EVENT_URL = process.env.REACT_APP_EVENT_URL;

    return (
        <DataContext.Provider value={{
            // the exported data or function go here
            DB_URL, TWILIO_URL, SENDGRID_URL, CHARITY_URL, BLOG_URL, USER_URL, EVENT_URL
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;