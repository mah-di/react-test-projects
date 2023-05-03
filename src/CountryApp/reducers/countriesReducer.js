export const initialState = {
    data: null,
    displayData: null,
    filters: {},
    nameSort: {
        active: false,
        sortOrder: true
    },
    populationSort: {
        active: false,
        sortOrder: true
    },
    areaSort: {
        active: false,
        sortOrder: true
    },
    totalCountries: null
}

export const reducer = (state, action) => {
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
            data: filteredData,
            displayData: filteredData,
            nameSort: {...defaultSortState},
            populationSort: {...defaultSortState},
            areaSort: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'REMOVE' ) {
        const id = action.payload
        filteredData = state.displayData.filter((country) => country.id !== id)

        return {
            ...state,
            displayData: filteredData,
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'SEARCH' ) {
        const searchValue = action.payload
        filteredData = state.data.filter((country) => {
            const countryName = country.name.common.toLowerCase()
            return countryName.startsWith(searchValue.toLowerCase())
        })

        return {
            ...state,
            displayData: filteredData,
            nameSort: {...defaultSortState},
            populationSort: {...defaultSortState},
            areaSort: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'FILTER' ) {
        const { region, minPopulation, maxPopulation, minArea, maxArea, data } = action.payload
        filteredData = data
        var filters = {}

        if ( region ) {
            filteredData = filteredData.filter((country) => country.region.startsWith(region))
            filters = {...filters, region}
        }
        if ( minPopulation ) {
            filteredData = filteredData.filter((country) => country.population >= Number(minPopulation))
            filters = {...filters, population_min: minPopulation}
        }
        if ( maxPopulation ) {
            filteredData = filteredData.filter((country) => country.population <= Number(maxPopulation))
            filters = {...filters, population_max: maxPopulation}
        }
        if ( minArea ) {
            filteredData = filteredData.filter((country) => country.area >= Number(minArea))
            filters = {...filters, area_min: minArea}
        }
        if ( maxArea ) {
            filteredData = filteredData.filter((country) => country.area <= Number(maxArea))
            filters = {...filters, area_max: maxArea}
        }

        return {
            ...state,
            displayData: filteredData,
            filters: filters,
            nameSort: {...defaultSortState},
            populationSort: {...defaultSortState},
            areaSort: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'SORTBYNAME') {
        filteredData = state.nameSort.sortOrder ? state.displayData.sort((c1, c2) => c1.name.common > c2.name.common ? 1 : -1) : state.displayData.sort((c1, c2) => c1.name.common > c2.name.common ? -1 : 1)
        order = !state.nameSort.sortOrder

        return {
            ...state,
            displayData: filteredData,
            nameSort: {
                active: true,
                sortOrder: order,
            },
            populationSort: {...defaultSortState},
            areaSort: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'SORTBYPOPULATION') {
        filteredData = state.populationSort.sortOrder ? state.displayData.sort((c1, c2) => c1.population > c2.population ? -1 : 1) : state.displayData.sort((c1, c2) => c1.population > c2.population ? 1 : -1)
        order = !state.populationSort.sortOrder

        return {
            ...state,
            displayData: filteredData,
            nameSort: {...defaultSortState},
            populationSort: {
                active: true,
                sortOrder: order,
            },
            areaSort: {...defaultSortState},
            totalCountries: filteredData.length
        }
    }
    if ( action.type === 'SORTBYAREA') {
        filteredData = state.areaSort.sortOrder ? state.displayData.sort((c1, c2) => c1.area > c2.area ? -1 : 1) : state.displayData.sort((c1, c2) => c1.area > c2.area ? 1 : -1)
        order = !state.areaSort.sortOrder

        return {
            ...state,
            displayData: filteredData,
            nameSort: {...defaultSortState},
            populationSort: {...defaultSortState},
            areaSort: {
                active: true,
                sortOrder: order,
            },
            totalCountries: filteredData.length
        }
    }

    return state
}