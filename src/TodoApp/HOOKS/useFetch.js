import { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [ todos, setTodos ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then((res) => {
                    if ( !res.ok ) {
                        throw Error('Error loading data from server.')
                    }
                    return res.json()
                })
                .then((data) => {
                    setTodos(data)
                    setError(null)
                })
                .catch((error) => setError(error.message))
                .finally(() => setIsLoading(false))
        }, 2000);
    }, [url])

    return { todos, isLoading, error, setTodos }
}

export default useFetch
