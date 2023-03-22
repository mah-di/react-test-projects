import { useState } from 'react'

import '../css/Item.css'

function Item(props) {
    const { name, price, rating, reviews } = props.data
    const [added, setAdded] = useState(false)

    function action() {
        if (!added) {
            props.setCartInfo((prev) => prev = {value: prev.value + 1, total: prev.total + price})
            setAdded(!added)
        }
    }
    return (
        <div className="item_wrapper">
            {props.preview && <h4 className='preview-header'>PREVIEW</h4>}
            <h4>{name}</h4>
            <p>Rating: {rating}</p>
            <p>Reviews: {reviews}</p>
            <h5>Price: {price}</h5>
            {!props.preview && <button onClick={action}>{added ? 'View Cart' : 'Add to Cart'}</button>}
        </div>
    )
}

export default Item
