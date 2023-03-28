import React from 'react'

import style from '../css/Filter.module.css'

const Sort = (props) => {
    const { sortByName, sortByPopulation, sortByArea } = props

    return (
        <div className={style['filter-wrapper']}>
            <button className={`${style.btn} ${sortByName.active && style['btn-active']}`} onClick={() => props.onNameSort()}>Name | { sortByName.sortOrder ? '[A-Z]' : '[Z-A]' }</button>
            <button className={`${style.btn} ${sortByPopulation.active && style['btn-active']}`} onClick={() => props.onPopulationSort()}>{ sortByPopulation.sortOrder ? '↑ Population ↓' : '↓ Population ↑' }</button>
            <button className={`${style.btn} ${sortByArea.active && style['btn-active']}`} onClick={() => props.onAreaSort()}>{ sortByArea.sortOrder ? '↑ Area ↓' : '↓ Area ↑' }</button>
        </div>
    )
}

export default Sort
