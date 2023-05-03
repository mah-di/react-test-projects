import React from 'react'
import { CountryContextProvider } from './contexts/CountryContext'
import Home from './components/Home'

const App = () => {
  return (
    <CountryContextProvider>
        <Home />
    </CountryContextProvider>
  )
}

export default App