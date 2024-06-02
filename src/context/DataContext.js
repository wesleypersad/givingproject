import { createContext } from "react";
import { useState, useEffect } from "react";
import useFetch2 from "../components/useFetch2";

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
    const { data: userKount, isPending, isError } = useFetch2(`${SERVER_URL}/noauth/usercount`, {}, 'usercount');
    const { data: skillKount, isPending2, isError2 } = useFetch2(`${SERVER_URL}/noauth/skillcount`, {}, 'skillcount');
    const { data: paymentKount, isPending3, isError3 } = useFetch2(`${SERVER_URL}/noauth/paymentcount`, {}, 'paymentcount');
    const { data: itemKount, isPending4, isError4 } = useFetch2(`${SERVER_URL}/noauth/itemcount`, {}, 'itemcount');
    const { data: eventKount, isPending5, isError5 } = useFetch2(`${SERVER_URL}/noauth/eventcount`, {}, 'eventcount');
    const { data: blogKount, isPending6, isError6 } = useFetch2(`${SERVER_URL}/noauth/blogcount`, {}, 'blogcount');

    // set the numbers state variables to be used by the context
    useEffect(() => {
        setUserCount(userKount);
    }, [userKount, setUserCount, isPending, isError]);
    useEffect(() => {
        setSkillCount(skillKount);
    }, [skillKount, setSkillCount, isPending2, isError2]);
    useEffect(() => {
        setPaymentCount(paymentKount);
    }, [paymentKount, setPaymentCount, isPending3, isError3]);
    useEffect(() => {
        setItemCount(itemKount);
    }, [itemKount, setItemCount, isPending4, isError4]);
    useEffect(() => {
        setEventCount(eventKount);
    }, [eventKount, setEventCount, isPending5, isError5]);
    useEffect(() => {
        setBlogCount(blogKount);
    }, [blogKount, setBlogCount, isPending6, isError6]);

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