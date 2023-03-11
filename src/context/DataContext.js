import { createContext } from "react";
import { useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // things we want to provide in the context
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;
    const [room, setRoom] = useState('payments');
    const [userCount, setUserCount] = useState(-99);
    const [skillCount, setSkillCount] = useState(-99);
    const [paymentCount, setPaymentCount] = useState(-99);
    const [itemCount, setItemCount] = useState(-99);
    const [eventCount, setEventCount] = useState(-99);
    const [blogCount, setBlogCount] = useState(-99);

    return (
        <DataContext.Provider value={{
            // the exported data or function go here
            SERVER_URL, FRONTEND_URL, room, setRoom, 
            userCount, setUserCount, skillCount, setSkillCount, paymentCount, setPaymentCount, 
            itemCount, setItemCount, eventCount, setEventCount, blogCount, setBlogCount
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;