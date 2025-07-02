import carrito from '../assets/carrito.png';

const CartWidget = () => {
    return (
        <div className="cart-widget">
            <img src={carrito} alt="carrito" className='carrito'/>
            <p>7</p>
        </div>
    )
}

export default CartWidget