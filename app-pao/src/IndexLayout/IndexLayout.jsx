// import { useRef } from 'react'
// import Navbar from '../components/Navbar/Navbar'
// import TableJoyas from '../components/TableJoyas/TableJoyas'
// import Filter from '../components/Filter/Filter'
// import Adjust from '../components/Adjust/Adjust'

// const IndexLayout = () => {
//   const tablaRef = useRef()

//   const manejarAjuste = () => {
//     tablaRef.current?.refrescar() 
//   }

//   return (
//     <div className='contenedor-general'>
//       <Navbar />
//       <span className='linea-navbar'></span>
//       <Filter />
//       <Adjust onAjuste={manejarAjuste} />
//       <TableJoyas ref={tablaRef} />
//     </div>
//   )
// }

// export default IndexLayout
import './IndexLayout.css'
import { useRef, useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import TableJoyas from '../components/TableJoyas/TableJoyas'
import CardsMobile from '../components/CardsMobile/CardsMobile'
import Filter from '../components/Filter/Filter'
import ActionsDropdown from '../components/ActionsDropdown/ActionsDropdown'

const IndexLayout = () => {
  const tablaRef = useRef()
  const [filtro, setFiltro] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // 👇 detectamos cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const manejarAjuste = () => {
    tablaRef.current?.refrescar()
  }

  return (
    <div className='contenedor-general'>
      <Navbar />
      <span className='linea-navbar'></span>

      <div className='contenido-filtros'>
        <Filter onSearch={setFiltro} />
        <ActionsDropdown onAjuste={manejarAjuste} />
      </div>

      {/* 👇 Mostramos cards o tabla según tamaño */}
      {windowWidth < 768 ? (
        <CardsMobile filtro={filtro} ref={tablaRef} />
      ) : (
        <TableJoyas ref={tablaRef} filtro={filtro} />
      )}
    </div>
  )
}

export default IndexLayout
