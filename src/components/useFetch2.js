import { useState, useEffect} from 'react';
import useSessionStorage from '../customHooks/useSessionStorage';

const useFetch2 = (url, options = {}, records) => {
    // this version of fetch will use the data in session storage 
    // otherwise it will initially fetch the data from the server
    // then store it in session storage to minimise server requests

    const [data, setData] =useState(null);
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

                //update session storage based on method used in options
                console.log('METHOD in fetchData ', options.method);

                switch (options.method) {
                    case 'POST':
                        // add the data to the session storage
                        // addRecord(data);

                        // then get the updated data from the session storage
                        //recordData = getRecords();
                        break;
                    case 'PUT':
                        // update the session storage by modifying the exisiting record with the id
                        // modifyRecord(data._id);

                        // then get the updated data from the session storage
                        //recordData = getRecords();
                        break;
                    case 'DELETE':
                        console.log('DELETE: ', options.body);  
                        // update the session storage by deleting the record with the id
                        //deleteRecord(data._id);

                        // then get the updated data from the session storage
                        //recordData = getRecords();
                        break;
                    default:
                        // set record data to the data returned from the fetch as GET returns all records
                        recordData = data;                        
                        break;
                };

                // store the updated data in session storage
                setRecords(recordData);

                //also store updated recordData in data to be returned
                setData(recordData);
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

        // find out what method is being passed
        console.log('METHOD IN useFETCH2 ', options.method);

        //check if records parameter exists and session storage is empty
        let recordData = getRecords();
        //console.log('JUST AFTER GET: ',recordData);

        //if we have records data and fetch method is empty(GET) session data can be returned
        //else we need to fetch the data from the server and update the session storage
        if (recordData && options.method === undefined) {
            setRecords(recordData);
            setData(recordData);
            setIsPending(false);
            setError(null);
            console.log(`useFetch2: ${records} from sess storage: `, recordData);
            return;
        } else {
            fetchData();
            console.log(`useFetch2: ${records} from url: `, recordData);
        };

        return () => abortCont.abort();
    }, [url, options, records]);

    return { data, isPending, error };
}

export default useFetch2;