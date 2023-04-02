import React, { useState, useContext, useEffect } from 'react'
import { FiltersContext } from '../contexts/FiltersContext'

import style from '../css/Filter.module.css'

const FilterByRegion = () => {
    const { onRegionFilter, filterSet } = useContext(FiltersContext)
    const { region } = filterSet

    const handleClick = (e) => {
        const setRegion = e.target.value
        onRegionFilter(setRegion)
    }

    return (
        <div className={style['filter-wrapper']}>
            <button className={style.btn} value='' onClick={handleClick}>All</button>
            <button className={`${style.btn} ${region === 'Asia' && style['btn-active']}`} value='Asia' onClick={handleClick}>Asia</button>
            <button className={`${style.btn} ${region === 'Africa' && style['btn-active']}`} value='Africa' onClick={handleClick}>Africa</button>
            <button className={`${style.btn} ${region === 'Americas' && style['btn-active']}`} value='Americas' onClick={handleClick}>Americas</button>
            <button className={`${style.btn} ${region === 'Antarctic' && style['btn-active']}`} value='Antarctic' onClick={handleClick}>Antarctic</button>
            <button className={`${style.btn} ${region === 'Europe' && style['btn-active']}`} value='Europe' onClick={handleClick}>Europe</button>
            <button className={`${style.btn} ${region === 'Oceania' && style['btn-active']}`} value='Oceania' onClick={handleClick}>Oceania</button>
        </div>
    )
}

const FilterByPopulation = () => {
    const { onPopulationFilter, filterSet } = useContext(FiltersContext)
    const { population_min, population_max } = filterSet
    const [ population, setPopulation ] = useState({minPopulation: '', maxPopulation: ''})

    useEffect(() => {
        population_min && setPopulation((prev) => {return {...prev, minPopulation: population_min}})
        population_max && setPopulation((prev) => {return {...prev, maxPopulation: population_max}})
    }, [population_min, population_max])
    
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
            <input type='number' placeholder='Minimum Population' name='minPopulation' value={population.minPopulation} onChange={handleChange} />
            <input type='number' placeholder='Maximum Population' name='maxPopulation' value={population.maxPopulation} onChange={handleChange} />
            <button type='submit' className={style.btn}>Set Population Filter</button>
        </form>
    )
}

const FilterByArea = () => {
    const { onAreaFilter, filterSet } = useContext(FiltersContext)
    const { area_min, area_max } = filterSet
    const [ area, setArea ] = useState({minArea: '', maxArea: ''})

    useEffect(() => {
        area_min && setArea((prev) => {return {...prev, minArea: area_min}})
        area_max && setArea((prev) => {return {...prev, minArea: area_max}})
    }, [area_min, area_max])

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
