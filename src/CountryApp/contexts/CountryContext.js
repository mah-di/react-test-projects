import React, { useCallback, useReducer } from "react";

import { reducer, initialState } from '../reducers/countriesReducer'
import { useSearchParams } from "react-router-dom";

export const CountryContext = React.createContext({})

export const CountryContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const [ filterParams, setFilterParams ] = useSearchParams()
    
    const region = filterParams.get('region')
    const minPopulation = filterParams.get('population_min')
    const maxPopulation = filterParams.get('population_max')
    const minArea = filterParams.get('area_min')
    const maxArea = filterParams.get('area_max')

    const values = {
        displayData: state.displayData,
        filters: state.filters,
        nameSort: state.nameSort,
        populationSort: state.populationSort,
        areaSort: state.areaSort,
        totalCountries: state.totalCountries,
        loadData: useCallback((payload) => dispatch({type: 'LOAD', payload}), []),
        removeCountry: (payload) => dispatch({type: 'REMOVE', payload}),
        searchCountries: (payload) => dispatch({type: 'SEARCH', payload}),
        filterCountries: useCallback((payload) => dispatch({type: 'FILTER', payload}), []),
        sortByName: (payload) => dispatch({type: 'SORTBYNAME', payload}),
        sortByPopulation: (payload) => dispatch({type: 'SORTBYPOPULATION', payload}),
        sortByArea: (payload) => dispatch({type: 'SORTBYAREA', payload}),
        region,
        minPopulation,
        maxPopulation,
        minArea,
        maxArea,
        setFilterParams
    }

    return (
        <CountryContext.Provider value={ values } >
            { children }
        </CountryContext.Provider>
    )
}