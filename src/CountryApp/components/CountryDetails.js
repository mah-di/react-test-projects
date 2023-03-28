import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const CountryDetails = () => {
    const navigate = useNavigate()
    const { name } = useParams()
    const location = useLocation()
    const { country } = location.state

    return (
        <div>
            <h2>Country: {name}</h2>
            <p>{country.capital[0]}</p>
            <p>{country.population}</p>
            <p>{country.area} Square KM</p>
            <p>{country.timezones[0]}</p>
            <p>{Object.keys(country.currencies)[0]}</p>
            <div className='back-to-home'>
                <button onClick={() => {navigate('/country-app')}}>Go Back</button>
            </div>    
        </div>
    )
}

export default CountryDetails
