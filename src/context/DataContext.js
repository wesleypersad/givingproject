import { createContext } from "react";
import { useState, useEffect } from "react";
import GetStore from "../functions/GetStore";

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

    //get the system stats using fetch
    const { data: userKount, isPending, error } = GetStore(`${SERVER_URL}/noauth/usercount`, {}, 'usercount');
    const { data: skillKount, isPending: isPending2, error: error2 } = GetStore(`${SERVER_URL}/noauth/skillcount`, {}, 'skillcount');
    const { data: paymentKount, isPending: isPending3, error: error3 } = GetStore(`${SERVER_URL}/noauth/paymentcount`, {}, 'paymentcount');
    const { data: itemKount, isPending: isPending4, error: error4 } = GetStore(`${SERVER_URL}/noauth/itemcount`, {}, 'itemcount');
    const { data: eventKount, isPending: isPending5, error: error5 } = GetStore(`${SERVER_URL}/noauth/eventcount`, {}, 'eventcount');
    const { data: blogKount, isPending: isPending6, error: error6 } = GetStore(`${SERVER_URL}/noauth/blogcount`, {}, 'blogcount');

    // set the numbers state variables to be used by the context
    useEffect(() => {
        setUserCount(userKount);
    }, [userKount, setUserCount, isPending, error]);
    useEffect(() => {
        setSkillCount(skillKount);
    }, [skillKount, setSkillCount, isPending2, error2]);
    useEffect(() => {
        setPaymentCount(paymentKount);
    }, [paymentKount, setPaymentCount, isPending3, error3]);
    useEffect(() => {
        setItemCount(itemKount);
    }, [itemKount, setItemCount, isPending4, error4]);
    useEffect(() => {
        setEventCount(eventKount);
    }, [eventKount, setEventCount, isPending5, error5]);
    useEffect(() => {
        setBlogCount(blogKount);
    }, [blogKount, setBlogCount, isPending6, error6]);

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