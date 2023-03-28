import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import StoreApp from './components/App'
import StoreAppAddNewProduct from './components/AddNewProduct'
import TodoApp from './TodoApp/components/App'
import FaqApp from './FAQs/FAQs'
import CountryApp from './CountryApp/components/App'
import Error404 from './defaultPages/Error404'
import HomePage from './defaultPages/HomePage'
import NavBar from './defaultPages/NavBar'
import CountryDetails from './CountryApp/components/CountryDetails'
import Protected from './defaultPages/Protected'
import Filters from './CountryApp/components/Filters'

const App = () => {
  return (
    <BrowserRouter >
        <NavBar />
        <Routes >
            <Route path='/' element={<HomePage />} />
            <Route path='/store-app' element={<StoreApp />} />
            <Route path='/store-app/add-new-product' element={
              <Protected isLoggedIn={false} >
                <StoreAppAddNewProduct />
              </Protected>
            } />
            <Route path='/todo-app' element={<TodoApp />} />
            <Route path='/faq-app' element={<FaqApp />} />
            <Route path='/country-app' element={<CountryApp />} />
            <Route path='/country-test' element={<Filters />} />
            <Route path='/country-app/:name' element={<CountryDetails />} />
            <Route path='*' element={<Error404 />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
