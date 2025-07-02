import CartWidget from "./CartWidget"

const Navbar = () => {
    return (
        <div className="navbar">
            <h1 className="logo"> Tienda de Mascostas</h1>

            <ul className="contenedor-links">
                <li className="nav-links">Juguetes</li>
                <li className="nav-links">Alimentos</li>
                <li className="nav-links">Collares</li>
                <li className="nav-links">Veterinario</li>
                <li className="nav-links">Otros</li>
            </ul>

            <CartWidget />
        </div>
    )
}

export default Navbar;