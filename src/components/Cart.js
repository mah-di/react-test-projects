import { Link } from "react-router-dom";
import "../css/Cart.css"

function Cart(props) {
    const cartInfo = props.cartInfo
    const value = cartInfo.length
    var total = 0
    cartInfo.forEach(item => {
        total += item.price        
    });

    return (
        <Link className="cart" to='add-new-product' state={{cartInfo}} >
            <p>Item {value} | Total {total}</p>
        </Link>
    )
}

export default Cart
