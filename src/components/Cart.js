import "../css/Cart.css"

function Cart(props) {
    const { value, total } = props.cartInfo

    return (
        <div className="cart">
            <p>Item {value} | Total {total}</p>
        </div>
    )
}

export default Cart
