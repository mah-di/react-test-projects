import React, { useContext, useEffect, useState } from 'react'

import style from '../css/SearchCountries.module.css'
import { CountryContext } from '../contexts/CountryContext'

const SearchCountries = () => {
    const [ searchValue, setSearchValue ] = useState('')
    const { searchCountries } = useContext(CountryContext)
    
    useEffect(() => {
        searchCountries(searchValue)
        // eslint-disable-next-line
    }, [searchValue])
    
    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className={style['search-wrapper']}>
            <input className={style['search-field']} placeholder='Search for a country...' type='text' name='search' id='search' value={searchValue} onChange={handleChange} />
        </div>
    )
}

export default SearchCountries
