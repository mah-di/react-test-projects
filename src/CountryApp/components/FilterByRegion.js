import React, { useState } from 'react'

import style from '../css/FilterByRegion.module.css'

const initialFilterState = {
    Asia: false,
    Africa: false,
    Americas: false,
    Antarctic: false,
    Europe: false,
    Oceania: false,
}

const FilterByRegion = (props) => {
    const [ filterState, setFilteState ] = useState(initialFilterState)

    const handleClick = (e) => {
        const region = e.target.value
        setFilteState({...initialFilterState, [region]: true})
        props.onRegionFilter(region)
    }

    return (
        <div className={style['filter-wrapper']}>
            <button className={style.btn} value='' onClick={handleClick}>All</button>
            <button className={`${style.btn} ${filterState.Asia && style['btn-active']}`} value='Asia' onClick={handleClick}>Asia</button>
            <button className={`${style.btn} ${filterState.Africa && style['btn-active']}`} value='Africa' onClick={handleClick}>Africa</button>
            <button className={`${style.btn} ${filterState.Americas && style['btn-active']}`} value='Americas' onClick={handleClick}>Americas</button>
            <button className={`${style.btn} ${filterState.Antarctic && style['btn-active']}`} value='Antarctic' onClick={handleClick}>Antarctic</button>
            <button className={`${style.btn} ${filterState.Europe && style['btn-active']}`} value='Europe' onClick={handleClick}>Europe</button>
            <button className={`${style.btn} ${filterState.Oceania && style['btn-active']}`} value='Oceania' onClick={handleClick}>Oceania</button>
        </div>
  )
}

export default FilterByRegion
