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
import { useRef, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import TableJoyas from '../components/TableJoyas/TableJoyas'
import Filter from '../components/Filter/Filter'
import ActionsDropdown from '../components/ActionsDropdown/ActionsDropdown'

const IndexLayout = () => {
  const tablaRef = useRef()
  const [filtro, setFiltro] = useState('')

  const manejarAjuste = () => {
    tablaRef.current?.refrescar()
  }

  return (
    <div className='contenedor-general'>
      <Navbar />
      <span className='linea-navbar'></span>

      <div className='contenido-filtros' >
        <Filter onSearch={setFiltro} />
        <ActionsDropdown onAjuste={manejarAjuste} />
      </div>

      {/* 👇 El nuevo dropdown con todas las acciones */}

      {/* ✅ Solo una tabla */}
      <TableJoyas ref={tablaRef} filtro={filtro} />
    </div>
  )
}

export default IndexLayout
