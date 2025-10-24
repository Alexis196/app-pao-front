import './indexLayout.css'
import Navbar from '../components/Navbar/Navbar'
import Filter from '../components/Filter/Filter'

const IndexLayout = () => {
  return (
    <div className='contenedor-general'>
        <Navbar/>
        <span className='linea-navbar'></span>
        <Filter />
    </div>
  )
}

export default IndexLayout