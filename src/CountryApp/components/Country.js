import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CountryContext } from '../contexts/CountryContext'

import style from '../css/Country.module.css'


const CapitalElement = (props) => {
    const capitals = props.capitals

    return (
        <div>
            {capitals.map((capital) => <p key={capital}>• {capital}</p>)}
        </div>
    )
}

const CurrenciesElement = (props) => {
    const currencies = {...props.currencies}

    return(
        <div>
            {Object.keys(currencies).map((cur) => <p key={cur}>{cur} • {currencies[cur].name}</p>)}
        </div>
    )
}

const Country = (props) => {
    const navigate = useNavigate()
    const { onRemove } = useContext(CountryContext)
    const country = props.country

    return (
        <div className={style.card}>
            <div className={style['card-flag']}>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
            <div className={style['card-body']}>
                <h2>{country.name.common}</h2>
                {
                    country.capital && 
                    <div className={style['sub-card']}>
                        <div>
                            Capital
                        </div>
                        <CapitalElement capitals={country.capital} />
                    </div>
                }
                <div className={style['card-middle']}>
                    <p>Region : <strong>{country.region}</strong></p>
                    <p>Area: <strong>{country.area}</strong> square km</p>
                    <p>Population: <strong>{country.population}</strong></p>
                </div>
                {
                    country.currencies && 
                    <div className={style['sub-card']}>
                        <div>
                            Currency
                        </div>
                        <CurrenciesElement currencies={country.currencies} />
                    </div>
                }
                <button onClick={() => {onRemove(country.id)}} className={style.btn}>Remove</button>
                <button onClick={() => {navigate(country.name.common)}} className={style.btn}>View Details</button>
            </div>
        </div>
    )
}

export default Country
