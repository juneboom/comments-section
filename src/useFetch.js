import {useState, useEffect} from 'react';

const useFetch = (url, dependencies) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //fetch comments
        fetch(url)
            .then(res => {
                if (!res.ok)
                    throw new Error(`Status Code: ${res.status}. Something went wrong with fetch.`);

                return res.json();
            })
            .then(data => {
                setData(data);
                console.log(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            });
    }, [url, dependencies]);

    return {data, isPending, error};
}

export default useFetch;