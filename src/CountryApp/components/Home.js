import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Countries from './Countries'
import style from '../css/App.module.css'
import SearchCountries from './SearchCountries'
import useFetchCountries from '../HOOKS/useFetchCountries'
import Sort from './Sort'
import { CountryContext } from '../contexts/CountryContext'
import Filters from './Filters'


const Home = () => {
    const navigate = useNavigate()
    const { data, isLoading, error } = useFetchCountries('https://restcountries.com/v3.1/all')
    const { displayData, totalCountries, region, minPopulation, maxPopulation, minArea, maxArea, loadData, filterCountries } = useContext(CountryContext)

    useEffect(() => {
        data && loadData(data)
    }, [data, loadData])

    useEffect(() => {
        data && filterCountries({region, minPopulation, maxPopulation, minArea, maxArea, data})
    }, [data, region, minPopulation, maxPopulation, minArea, maxArea, filterCountries])

    return (
        <div className={style.app}>
            {isLoading && <h4 className={style['total-countries-count']}>Loading, please wait...</h4>}
            {error && <h4 className={style['total-countries-count']}>{error}</h4>}
            {!isLoading && error === null && displayData && <Filters />}
            {!isLoading && error === null && displayData && <Sort />}
            {!isLoading && error === null && displayData && <SearchCountries />}
            {!isLoading && error === null && <h1 className={style['total-countries-count']}>{ totalCountries } Countries</h1>}
            { displayData && <Countries /> }
            <div className='back-to-home'>
            <button onClick={() => navigate('/')}>Back to Home Page</button>
            </div>
        </div>
    )
}

export default Home
