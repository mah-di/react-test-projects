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

const Country = ({ country }) => {
    const navigate = useNavigate()
    const { removeCountry } = useContext(CountryContext)

    const handleCardClick = () => {
        navigate(country.name.common, {state: {country}})
    }

    const handleRemove = (e) => {
        e.stopPropagation()
        removeCountry(country.id)
    }

    return (
        <div className={style.card} onClick={handleCardClick}>
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
                    <p>Area: <strong>{country.area}</strong> km²</p>
                    <p>Population: <strong>{country.population}</strong></p>
                    <p>Density: <strong>{(country.population/country.area).toFixed(1)}</strong> man/km²</p>
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
                <div className={style.actions}>
                    <button onClick={handleRemove} className={style.btn}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default Country
