import React from 'react'
import { useNavigate } from 'react-router-dom'

import style from '../css/App.module.css'
import Home from './Home'

const App = () => {
    const navigate = useNavigate()

    return (
        <div className={style.app}>
            <Home />
            <div className='back-to-home'>
                <button onClick={() => navigate('/')}>Back to Home Page</button>
            </div>
        </div>
    )
}

export default App
