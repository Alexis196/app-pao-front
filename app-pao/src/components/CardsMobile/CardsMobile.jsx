import './CardsMobile.css'
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import EditProductModal from '../EditProductModal/EditProductModal'

const CardsMobile = forwardRef(({ filtro }, ref) => {
  const [joyas, setJoyas] = useState([])
  const [loading, setLoading] = useState(false)

  const [modalEliminarVisible, setModalEliminarVisible] = useState(false)
  const [productoAEliminar, setProductoAEliminar] = useState(null)

  const [modalEditarVisible, setModalEditarVisible] = useState(false)
  const [productoAEditar, setProductoAEditar] = useState(null)

  // 🔹 Paginación del backend
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const productosPorPagina = 10

  const obtenerJoyas = async (pagina = 1) => {
    try {
      setLoading(true)
      const res = await axios.get(`https://app-pao-back.onrender.com/api/joyas?page=${pagina}&limit=${productosPorPagina}`)
      const data = res.data
      setJoyas(data.joyas ?? [])
      setTotalPaginas(data.totalPaginas ?? 1)
      setPaginaActual(data.paginaActual ?? pagina)
    } catch (err) {
      console.error('Error al obtener joyas:', err)
      setJoyas([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerJoyas(1)
  }, [])

  // 🔹 Permitir refrescar desde el padre
  useImperativeHandle(ref, () => ({
    refrescar: () => obtenerJoyas(paginaActual)
  }))

  const confirmarEliminacion = (id) => {
    setProductoAEliminar(id)
    setModalEliminarVisible(true)
  }

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`https://app-pao-back.onrender.com/api/joyas/${id}`)
      obtenerJoyas(paginaActual)
    } catch (err) {
      console.error('Error al eliminar el producto:', err)
    } finally {
      setModalEliminarVisible(false)
      setProductoAEliminar(null)
    }
  }

  const abrirModalEdicion = (producto) => {
    setProductoAEditar(producto)
    setModalEditarVisible(true)
  }

  const onEdited = () => {
    obtenerJoyas(paginaActual)
  }

  // 🔹 Filtrado local
  const joyasFiltradas = joyas.filter((joya) => {
    const producto = joya.producto ? joya.producto.toLowerCase() : ''
    const codigo = joya.codigo ? joya.codigo.toString().toLowerCase() : ''
    const filtroTexto = filtro ? filtro.toLowerCase() : ''
    return producto.includes(filtroTexto) || codigo.includes(filtroTexto)
  })

  return (
    <div className="cards-container">
      {loading ? (
        <p className="no-resultados">Cargando...</p>
      ) : joyasFiltradas.length > 0 ? (
        <>
          {joyasFiltradas
            .sort((a, b) => Number(a.codigo) - Number(b.codigo))
            .map((joya) => (
              <article key={joya._id} className="card">
                <div className="card-content">
                  <div className="card-info">
                    <h3 className="card-title">{joya.producto}</h3>
                    <p><strong>Código:</strong> {joya.codigo}</p>
                    <p><strong>Precio:</strong> ${joya.precio}</p>
                    <p><strong>Cantidad:</strong> {joya.cantidad}</p>
                    {joya.descripcion && (
                      <p className="descripcion">{joya.descripcion}</p>
                    )}
                  </div>

                  <div className="card-buttons">
                    <button
                      className="btn editar"
                      onClick={() => abrirModalEdicion(joya)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                      <span>Editar</span>
                    </button>

                    <button
                      className="btn eliminar"
                      onClick={() => confirmarEliminacion(joya._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}

          {/* 🔹 Paginación desde el backend */}
          {totalPaginas > 1 && (
            <div className="paginacion">
              {[...Array(totalPaginas)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => obtenerJoyas(i + 1)}
                  className={`btn-pagina ${paginaActual === i + 1 ? 'activa' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="no-resultados">No se encontraron productos 😕</p>
      )}

      <ConfirmModal
        visible={modalEliminarVisible}
        onConfirm={() => eliminarProducto(productoAEliminar)}
        onCancel={() => setModalEliminarVisible(false)}
        mensaje="¿Seguro que querés eliminar este producto? Esta acción no se puede deshacer."
      />

      <EditProductModal
        visible={modalEditarVisible}
        producto={productoAEditar}
        onClose={() => setModalEditarVisible(false)}
        onUpdated={onEdited}
      />
    </div>
  )
})

export default CardsMobile
