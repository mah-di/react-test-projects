import React, { useState, useContext, useEffect } from 'react'

import style from '../css/Filter.module.css'
import { CountryContext } from '../contexts/CountryContext'

const FilterByRegion = () => {
    const { filters, region, setFilterParams } = useContext(CountryContext)

    const handleClick = (e) => {
        const setRegion = e.target.value

        var updatedFilter = {...filters, region: setRegion}
        !setRegion && delete updatedFilter.region

        setFilterParams({...updatedFilter})
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
    const { filters, minPopulation, maxPopulation, setFilterParams } = useContext(CountryContext)
    const [ population, setPopulation ] = useState({population_min: '', population_max: ''})
    
    useEffect(() => {
        minPopulation && setPopulation((prev) => {return {...prev, population_min: minPopulation}})
        maxPopulation && setPopulation((prev) => {return {...prev, population_max: maxPopulation}})
    }, [minPopulation, maxPopulation])
    
    const handleChange = (e) => {
        const name = e.target.name
        setPopulation(prev => {return {...prev, [name]: e.target.value}})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        var updatedFilter = {...filters, ...population}
        !population.population_max && delete updatedFilter.population_max
        !population.population_min && delete updatedFilter.population_min

        setFilterParams({...updatedFilter})
    }
    
    return (
        <form onSubmit={handleSubmit} className={style['filter-wrapper']}>
            <input type='number' placeholder='Minimum Population' name='population_min' value={population.population_min} onChange={handleChange} />
            <input type='number' placeholder='Maximum Population' name='population_max' value={population.population_max} onChange={handleChange} />
            <button type='submit' className={style.btn}>Set Population Filter</button>
        </form>
    )
}

const FilterByArea = () => {
    const { filters, minArea, maxArea, setFilterParams } = useContext(CountryContext)
    const [ area, setArea ] = useState({area_min: '', area_max: ''})

    useEffect(() => {
        minArea && setArea((prev) => {return {...prev, area_min: minArea}})
        maxArea && setArea((prev) => {return {...prev, area_max: maxArea}})
    }, [minArea, maxArea])

    const handleChange = (e) => {
        const name = e.target.name
        setArea(prev => {return {...prev, [name]: e.target.value}})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        var updatedFilter = {...filters, ...area}
        !area.area_max && delete updatedFilter.area_max
        !area.area_min && delete updatedFilter.area_min

        setFilterParams({...updatedFilter})
    }

    return (
        <form onSubmit={handleSubmit} className={style['filter-wrapper']}>
            <input type='number' placeholder='Minimum Area' name='area_min' value={area.area_min} onChange={handleChange} />
            <input type='number' placeholder='Maximum Area' name='area_max' value={area.area_max} onChange={handleChange} />
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
