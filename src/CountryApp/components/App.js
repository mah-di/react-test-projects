import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Countries from './Countries'
import style from '../css/App.module.css'
import SearchCountries from './SearchCountries'
import useFetchCountries from '../HOOKS/useFetchCountries'
import Sort from './Sort'
import reducer from '../utils/reducer'
import { CountryContext } from '../contexts/CountryContext'
import { FiltersContext } from '../contexts/FiltersContext'
import Filters from './Filters'


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
    const [ filterSet, setFilterSet ] = useState(null)
    const [ filters, setFilters ] = useSearchParams()
    const { data, isLoading, error } = useFetchCountries('https://restcountries.com/v3.1/all')
    const [ displayData, dispatch ] = useReducer(reducer, initialState)
    const { filteredData, sortByName, sortByPopulation, sortByArea, totalCountries } = displayData

    const region = filters.get('region')
    const minPopulation = filters.get('population_min')
    const maxPopulation = filters.get('population_max')
    const minArea = filters.get('area_min')
    const maxArea = filters.get('area_max')

    useEffect(() => {
        data && dispatch({type: 'LOAD', payload: data})
    }, [data])

    useEffect(() => {
        if ( data ) {
            region && setFilterSet((prev) => {return {...prev, region}})
            minPopulation && setFilterSet((prev) => {return {...prev, population_min: minPopulation}})
            maxPopulation && setFilterSet((prev) => {return {...prev, population_max: maxPopulation}})
            minArea && setFilterSet((prev) => {return {...prev, area_min: minArea}})
            maxArea && setFilterSet((prev) => {return {...prev, area_max: maxArea}})
            dispatch({type: 'FILTER', payload: {region, minPopulation, maxPopulation, minArea, maxArea, data}})
        }
    }, [data, region, minPopulation, maxPopulation, minArea, maxArea])

    useEffect(() => {
        data && filterSet && setFilters({...filterSet})
    }, [filterSet, setFilters, data])

    const handleRemove = (id) => {
        dispatch({type: 'REMOVE', payload: id})
    }

    const handleSearchCountry = (searchValue) => {
        dispatch({type: 'SEARCH', payload: {searchValue, data}})
    }

    const handleRegionFilter = (region) => {
        if ( region !== '' ) {
            setFilterSet((prev) => {return {...prev, region: region}})
        } else {
            setFilterSet((prev) => {
                delete prev.region
                return {...prev}
            })
        }
    }

    const handleAreaFilter = (area) => {
        area.minArea !== ''
            ?
            setFilterSet((prev) => {return {...prev, area_min: area.minArea}})
            :
            setFilterSet((prev) => {
                delete prev.area_min
                return {...prev}
            })

        area.maxArea !== ''
            ?
            setFilterSet((prev) => {return {...prev, area_max: area.maxArea}})
            :
            setFilterSet((prev) => {
                delete prev.area_max
                return {...prev}
            })
    }

    const handlePopulationFilter = (population) => {
        population.minPopulation !== ''
            ?
            setFilterSet((prev) => {return {...prev, population_min: population.minPopulation}})
            :
            setFilterSet((prev) => {
                delete prev.population_min
                return {...prev}
            })
        
        population.maxPopulation !== ''
            ?
            setFilterSet((prev) => {return {...prev, population_max: population.maxPopulation}})
            :
            setFilterSet((prev) => {
                delete prev.population_max
                return {...prev}
            })
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
            {!isLoading && error === null && filteredData && 
                <FiltersContext.Provider value={{onRegionFilter: handleRegionFilter, onAreaFilter: handleAreaFilter, onPopulationFilter: handlePopulationFilter, filterSet}} >
                    <Filters />
                </FiltersContext.Provider>
            }
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
