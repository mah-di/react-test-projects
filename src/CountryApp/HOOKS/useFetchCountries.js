import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import useFetch from './useFetch'

const useFetchCountries = (url) => {
    const { data, isLoading, error, setData } = useFetch(url)

    useEffect(() => {
        data && setData(data.map((country) => {
            return {...country, id: uuidv4()}
        }))
    }, [url])

    return { data, isLoading, error }
}

export default useFetchCountries
