import React, { useState, useContext } from 'react'
import { FiltersContext } from '../contexts/FiltersContext'

import style from '../css/Filter.module.css'

const initialFilterState = {
    Asia: false,
    Africa: false,
    Americas: false,
    Antarctic: false,
    Europe: false,
    Oceania: false,
}

const FilterByRegion = () => {
    const { onRegionFilter } = useContext(FiltersContext)
    const [ filterState, setFilteState ] = useState(initialFilterState)

    const handleClick = (e) => {
        const region = e.target.value
        setFilteState({...initialFilterState, [region]: true})
        onRegionFilter(region)
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

const FilterByPopulation = () => {
    const { onPopulationFilter } = useContext(FiltersContext)
    const [ population, setPopulation ] = useState({minPopulation: '', maxPopulation: ''})

    const handleChange = (e) => {
        const name = e.target.name
        setPopulation(prev => {return {...prev, [name]: e.target.value}})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onPopulationFilter(population)
    }

    return (
        <form onSubmit={handleSubmit} className={style['filter-wrapper']}>
            <input type='text' value='any' hidden />
            <input type='number' placeholder='Minimum Population' name='minPopulation' value={population.minPopulation} onChange={handleChange} />
            <input type='number' placeholder='Maximum Population' name='maxPopulation' value={population.maxPopulation} onChange={handleChange} />
            <button type='submit' className={style.btn}>Set Population Filter</button>
        </form>
    )
}

const FilterByArea = () => {
    const { onAreaFilter } = useContext(FiltersContext)
    const [ area, setArea ] = useState({minArea: '', maxArea: ''})

    const handleChange = (e) => {
        const name = e.target.name
        setArea(prev => {return {...prev, [name]: e.target.value}})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onAreaFilter(area)
    }

    return (
        <form onSubmit={handleSubmit} className={style['filter-wrapper']}>
            <input type='text' value='any' hidden />
            <input type='number' placeholder='Minimum Area' name='minArea' value={area.minArea} onChange={handleChange} />
            <input type='number' placeholder='Maximum Area' name='maxArea' value={area.maxArea} onChange={handleChange} />
            <button type='submit' className={style.btn}>Set Area Filter</button>
        </form>
    )
}

const Filters = () => {
  return (
    <div>
        <FilterByPopulation />
        <FilterByArea />
        <FilterByRegion />
    </div>
  )
}

export default Filters
