import './indexLayout.css'
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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const manejarAjuste = () => {
    tablaRef.current?.refrescar()
  }

  return (
    <div className="contenedor-general">
      <Navbar />
      <span className="linea-navbar"></span>

      <div className="contenido-filtros">
        <Filter onSearch={setFiltro} />
        <ActionsDropdown onAjuste={manejarAjuste} />
      </div>

      {windowWidth < 1024 ? (
        <CardsMobile filtro={filtro} ref={tablaRef} />
      ) : (
        <TableJoyas filtro={filtro} ref={tablaRef} />
      )}
    </div>
  )
}

export default IndexLayout
