import React, { useContext } from 'react'

import Country from './Country'
import style from '../css/Countries.module.css'
import { CountryContext } from '../contexts/CountryContext'

const Countries = (props) => {
    const { displayData } = useContext(CountryContext)

    return (
        <div className={style['card-wrapper']}>
            {displayData.map((country) => <Country key={country.id} country={country} onRemove={props.onRemove} />)}
        </div>
    )
}

export default Countries
