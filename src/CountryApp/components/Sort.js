import React, { useContext } from 'react'

import style from '../css/Filter.module.css'
import { CountryContext } from '../contexts/CountryContext'

const Sort = () => {
    const { nameSort, populationSort, areaSort, sortByName, sortByPopulation, sortByArea } = useContext(CountryContext)

    return (
        <div className={style['filter-wrapper']}>
            <button className={`${style.btn} ${nameSort.active && style['btn-active']}`} onClick={() => sortByName()}>Name | { nameSort.sortOrder ? '[A-Z]' : '[Z-A]' }</button>
            <button className={`${style.btn} ${populationSort.active && style['btn-active']}`} onClick={() => sortByPopulation()}>{ populationSort.sortOrder ? '↑ Population ↓' : '↓ Population ↑' }</button>
            <button className={`${style.btn} ${areaSort.active && style['btn-active']}`} onClick={() => sortByArea()}>{ areaSort.sortOrder ? '↑ Area ↓' : '↓ Area ↑' }</button>
        </div>
    )
}

export default Sort
