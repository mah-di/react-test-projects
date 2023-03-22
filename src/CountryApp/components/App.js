import React, { useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

import Countries from './Countries'
import style from '../css/App.module.css'
import SearchCountries from './SearchCountries'
import useFetchCountries from '../HOOKS/useFetchCountries'
import FilterByRegion from './FilterByRegion'
import Sort from './Sort'
import reducer from '../utils/reducer'
import { CountryContext } from '../contexts/CountryContext'


const initialState = {
    filteredData: null,
    sortByName: {
        active: false,
        sortOrder: true
    },
    sortByPopulation: {
        active: false,
        sortOrder: true    
    },
    sortByArea: {
        active: false,
        sortOrder: true    
    },
    totalCountries: null
}

const App = () => {
    const navigate = useNavigate()
    const { data, isLoading, error } = useFetchCountries('https://restcountries.com/v3.1/all')
    const [ displayData, dispatch ] = useReducer(reducer, initialState)
    const { filteredData, sortByName, sortByPopulation, sortByArea, totalCountries } = displayData

    useEffect(() => {
        data && dispatch({type: 'LOAD', payload: data})
    }, [data])

    const handleRemove = (id) => {
        dispatch({type: 'REMOVE', payload: id})
    }
    
    const handleSearchCountry = (searchValue) => {
        dispatch({type: 'SEARCH', payload: {searchValue, data}})
    }

    const handleRegionFilter = (region) => {
        dispatch({type: 'FILTERBYREGION', payload: {region, data}})
    }

    const handleNameSort = () => {
        dispatch({type: 'SORTBYNAME', payload: null})
    }

    const handlePopulationSort = () => {
        dispatch({type: 'SORTBYPOPULATION', payload: null})
    }

    const handleAreaSort = () => {
        dispatch({type: 'SORTBYAREA', payload: null})
    }

    return (
        <div className={style.app}>
            {isLoading && <h4 className={style['total-countries-count']}>Loading, please wait...</h4>}
            {error && <h4 className={style['total-countries-count']}>{error}</h4>}
            {!isLoading && error === null && filteredData && <FilterByRegion onRegionFilter={handleRegionFilter} />}
            {!isLoading && error === null && filteredData && <Sort onNameSort={handleNameSort} sortByName={sortByName} onPopulationSort={handlePopulationSort} sortByPopulation={sortByPopulation} onAreaSort={handleAreaSort} sortByArea={sortByArea} />}
            {!isLoading && error === null && filteredData && <SearchCountries onSearchCountry={handleSearchCountry} />}
            {!isLoading && error === null && <h1 className={style['total-countries-count']}>{totalCountries} Countries</h1>}
            {filteredData && 
                <CountryContext.Provider value={{countries: filteredData, onRemove: handleRemove}} >
                    <Countries />
                </CountryContext.Provider>
            }
            <div className='back-to-home'>
              <button onClick={() => navigate('/')}>Back to Home Page</button>
            </div>
        </div>
    )
}

export default App
