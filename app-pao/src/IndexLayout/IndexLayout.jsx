import './indexLayout.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import TableJoyas from '../components/TableJoyas/TableJoyas'
import CardsMobile from '../components/CardsMobile/CardsMobile'
import Filter from '../components/Filter/Filter'
import ActionsDropdown from '../components/ActionsDropdown/ActionsDropdown'

const IndexLayout = () => {
  const [filtro, setFiltro] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const [joyas, setJoyas] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  const productosPorPagina = 10

  const obtenerJoyas = async (pagina = 1) => {
    const res = await axios.get(
      'https://app-pao-back.onrender.com/api/joyas',
      {
        params: {
          page: pagina,
          limit: productosPorPagina,
          search: filtro
        }
      }
    )

    setJoyas(res.data.joyas)
    setPaginaActual(res.data.paginaActual)
    setTotalPaginas(res.data.totalPaginas)
  }

  // 🔍 Buscar global
  useEffect(() => {
    obtenerJoyas(1)
  }, [filtro])

  // 📐 Resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="contenedor-general">
      <Navbar />
      <span className="linea-navbar" />

      <div className="contenido-filtros">
        <Filter onSearch={setFiltro} />
        <ActionsDropdown onAjuste={() => obtenerJoyas(paginaActual)} />
      </div>

      {windowWidth < 1024 ? (
        <CardsMobile
          joyas={joyas}
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onPageChange={obtenerJoyas}
        />
      ) : (
        <TableJoyas
          joyas={joyas}
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onPageChange={obtenerJoyas}
        />
      )}
    </div>
  )
}

export default IndexLayout
