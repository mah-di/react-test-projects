import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../HOOKS/useFetch'

const CountryDetails = () => {
    const { name } = useParams()
    const { data, isLoading, error } = useFetch(`https://restcountries.com/v3.1/name/${name.replaceAll(' ', '%20')}`)
    console.log(data)
    const country = data && data[0]

    return (
        <div>
            {data && <h2>{country.name.common}</h2>}
        </div>
    )
}

export default CountryDetails
