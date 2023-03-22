import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [ data, setData ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        fetch(url)
            .then((res) => {
                if ( !res.ok ) {
                    throw Error('Error while fetching data')
                }
                return res.json()
            })
            .then((data) => {
                setData(data)
                setError(null)
            })
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false))
    }, [url])

    return { data, isLoading, error, setData }
}

export default useFetch
