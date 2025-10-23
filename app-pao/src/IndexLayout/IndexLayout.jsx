import './indexLayout.css'
import Navbar from '../components/Navbar/Navbar'
import TableJoyas from '../components/TableJoyas/TableJoyas'

const IndexLayout = () => {
  return (
    <div className='contenedor-general'>
        <Navbar/>
        <span className='linea-navbar'></span>
        <TableJoyas />
    </div>
  )
}

export default IndexLayout