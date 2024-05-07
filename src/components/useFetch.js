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

        fetchData();

        return () => abortCont.abort();
    }, [url, options, error]);

    return { data, isPending, error }
}

export default useFetch;