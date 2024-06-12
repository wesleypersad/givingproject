import { useState, useEffect} from 'react';
import useSessionStorage from '../customHooks/useSessionStorage';

const GetStore = (url, options = {}, records) => {
    // this will attempt to use the data in session storage 
    // otherwise it will initially fetch the data from the server
    // then store it in session storage to minimise server requests
    // this will only be used for GET requests !!!

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { setRecords, getRecords } = useSessionStorage(records);

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(url, { ...options, signal: abortCont.signal });
                if (!response.ok) {
                    throw Error('There was a problem with the fetch operation: ' + error.message);
                }
                if (!response.headers.get('content-type').includes('application/json')) {
                    throw Error('Received non-JSON response');
                }
                // get the data returned from the fetch for get this will be all the records data
                const data = await response.json();

                // store the updated data in session storage
                //also store updated recordData in data to be returned
                setRecords(data);
                setData(data);
                setIsPending(false);
                setError(null);

            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            }
        };

        //check if records parameter exists and session storage is empty
        let recordData = getRecords();

        //if we have records data session data can be returned else 
        //we need to fetch the data from the server and update the session storage
        if (recordData) {
            setRecords(recordData);
            setData(recordData);
            setIsPending(false);
            setError(null);
            console.log(`GetStore: ${records} from sess store: `, recordData);
            return;
        } else {
            fetchData();
            console.log(`GetStore: ${records} from url: `, recordData);
        };

        return () => abortCont.abort();
    }, [url, options, records]);

    return { data, isPending, error };
};

export default GetStore;