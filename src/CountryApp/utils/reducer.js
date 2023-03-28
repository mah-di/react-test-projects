const reducer = (state, action) => {
    const defaultSortState = {
        active: false,
        sortOrder: true,
    }
    var filteredData = null
    var order = null

    if ( action.type === 'LOAD' ) {
        filteredData = [...action.payload]

        return {
            ...state,
            filteredData: filteredData,
            sortByName: {...defaultSortState},
            sortByPopulation: {...defaultSortState},
            sortByArea: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'REMOVE' ) {
        const id = action.payload
        filteredData = state.filteredData.filter((country) => country.id !== id)

        return {
            ...state,
            filteredData: filteredData,
            sortByName: {...defaultSortState},
            sortByPopulation: {...defaultSortState},
            sortByArea: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'SEARCH' ) {
        const { searchValue, data } = action.payload
        filteredData = data.filter((country) => {
            const countryName = country.name.common.toLowerCase()
            return countryName.startsWith(searchValue.toLowerCase())
        })

        return {
            ...state,
            filteredData: filteredData,
            sortByName: {...defaultSortState},
            sortByPopulation: {...defaultSortState},
            sortByArea: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'FILTER' ) {
        const { region, minPopulation, maxPopulation, minArea, maxArea, data } = action.payload
        filteredData = data

        if ( region ) {
            filteredData = filteredData.filter((country) => country.region.startsWith(region))
        }
        if ( minPopulation ) {
            filteredData = filteredData.filter((country) => country.population >= Number(minPopulation))
        }
        if ( maxPopulation ) {
            filteredData = filteredData.filter((country) => country.population <= Number(maxPopulation))
        }
        if ( minArea ) {
            filteredData = filteredData.filter((country) => country.area >= Number(minArea))
        }
        if ( maxArea ) {
            filteredData = filteredData.filter((country) => country.area <= Number(maxArea))
        }
        
        return {
            ...state,
            filteredData: filteredData,
            sortByName: {...defaultSortState},
            sortByPopulation: {...defaultSortState},
            sortByArea: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'SORTBYNAME') {
        filteredData = state.sortByName.sortOrder ? state.filteredData.sort((c1, c2) => c1.name.common > c2.name.common ? 1 : -1) : state.filteredData.sort((c1, c2) => c1.name.common > c2.name.common ? -1 : 1)
        order = !state.sortByName.sortOrder
        
        return {
            ...state,
            filteredData: filteredData,
            sortByName: {
                active: true,
                sortOrder: order,
            },
            sortByPopulation: {...defaultSortState},
            sortByArea: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'SORTBYPOPULATION') {
        filteredData = state.sortByPopulation.sortOrder ? state.filteredData.sort((c1, c2) => c1.population > c2.population ? -1 : 1) : state.filteredData.sort((c1, c2) => c1.population > c2.population ? 1 : -1)
        order = !state.sortByPopulation.sortOrder
        
        return {
            ...state,
            filteredData: filteredData,
            sortByName: {...defaultSortState},
            sortByPopulation: {
                active: true,
                sortOrder: order,
            },
            sortByArea: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'SORTBYAREA') {
        filteredData = state.sortByArea.sortOrder ? state.filteredData.sort((c1, c2) => c1.area > c2.area ? -1 : 1) : state.filteredData.sort((c1, c2) => c1.area > c2.area ? 1 : -1)
        order = !state.sortByArea.sortOrder
        
        return {
            ...state,
            filteredData: filteredData,
            sortByName: {...defaultSortState},
            sortByPopulation: {...defaultSortState},
            sortByArea: {
                active: true,
                sortOrder: order,
            },
            totalCountries: filteredData.length
        }
    }

    return state
}

export default reducer
