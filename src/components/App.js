import { useState, useEffect } from 'react'

import '../css/App.css';
import Item from './Item'
import Cart from './Cart'
import Form from './Form'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
  const [cartInfo, setCartInfo] = useState({'value': 0, 'total': 0})
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => setItems(data))
      .then(console.log("FETCHED"))
  }, [cartInfo])

  const user = 'Iqbal Mahdi'

  const handleNewProduct = (product) => {
    setItems((prev) => [...prev, product])
  }

  return (
    <div className="app">
      <Cart cartInfo={cartInfo} />
      <h2>Hey {user}, Welcome back!</h2>
      <div>
        <h3>Products</h3>
        {items.map(item => <Item data={item} setCartInfo={setCartInfo} key={item.id} />)}
      </div>
      {<Form onNewProduct={handleNewProduct} />}
      <div className='back-to-home'>
        <button onClick={() => navigate('/')}>Back to Home Page</button>
      </div>
    </div>
  );

}

export default App;
