import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

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

    const setId = useCallback(() => {
        setData((prev) => prev.map((country) => {
            return {...country, id: uuidv4()}
        }))
    }, [])

    return { data, isLoading, error, setId }
}

export default useFetch
