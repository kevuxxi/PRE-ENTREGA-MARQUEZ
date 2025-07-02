import './App.css'
import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer'

function App() {


  return (
    <div>
      <Navbar />
      <ItemListContainer nombre={"Bienvenido a mi Tienda"} />
    </div>
  )
}

export default App
