import { useEffect } from 'react'

import useFetch from './useFetch'

const useFetchCountries = (url) => {
    const { data, isLoading, error, setId } = useFetch(url)

    useEffect(() => {
        data && data[0].id === null && setId()
    }, [url, isLoading, data, setId])

    return { data, isLoading, error }
}

export default useFetchCountries
