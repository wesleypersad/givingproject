import { useState, useEffect} from 'react';

const useFetch = (url, options = {}) => {
    const [data, setData] =useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

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
                const data = await response.json();
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

        // find out what method is being passed
        console.log('METHOD IN useFETCH ', options.method);

        //console.log('useFetch: fetching data from url: ', url);
        fetchData();

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;