import './TableJoyas.css'
import TrTable from '../TrTable/TrTable'
import ThTable from '../ThTable/ThTable'
import TdTable from '../TdTable/TdTable'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import EditProductModal from '../EditProductModal/EditProductModal'
import axios from 'axios'
import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faTrash,
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons'

const TableJoyas = forwardRef(({ filtro }, ref) => {
  const [joyas, setJoyas] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  const [modalVisible, setModalVisible] = useState(false)
  const [productoAEliminar, setProductoAEliminar] = useState(null)

  const [modalEditarVisible, setModalEditarVisible] = useState(false)
  const [productoAEditar, setProductoAEditar] = useState(null)

  const joyasPorPagina = 10

  // 🔍 Buscar en backend cuando cambia el filtro
 useEffect(() => {
  obtenerJoyas(1)
}, [filtro])



  const obtenerJoyas = async (pagina = 1) => {
    try {
      const res = await axios.get(
        'https://app-pao-back.onrender.com/api/joyas',
        {
          params: {
            page: pagina,
            limit: joyasPorPagina,
            search: filtro
          }
        }
      )

      const data = res.data
      setJoyas(data.joyas)
      setTotalPaginas(data.totalPaginas)
      setPaginaActual(data.paginaActual)
    } catch (err) {
      console.error('Error al obtener joyas:', err)
    }
  }

  const actualizarCantidad = async (id, nuevaCantidad) => {
    if (nuevaCantidad < 0) return

    try {
      await axios.put(
        `https://app-pao-back.onrender.com/api/joyas/${id}`,
        { cantidad: nuevaCantidad }
      )

      setJoyas(prev =>
        prev.map(j =>
          j._id === id ? { ...j, cantidad: nuevaCantidad } : j
        )
      )
    } catch (err) {
      console.error('Error al actualizar la cantidad:', err)
    }
  }

  const confirmarEliminacion = (id) => {
    setProductoAEliminar(id)
    setModalVisible(true)
  }

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(
        `https://app-pao-back.onrender.com/api/joyas/${id}`
      )

      setJoyas(prev => prev.filter(j => j._id !== id))
    } catch (err) {
      console.error('Error al eliminar el producto:', err)
    } finally {
      setModalVisible(false)
      setProductoAEliminar(null)
    }
  }

  const abrirModalEdicion = (producto) => {
    setProductoAEditar(producto)
    setModalEditarVisible(true)
  }

  const cambiarPagina = (numero) => {
    obtenerJoyas(numero)
  }

  useImperativeHandle(ref, () => ({
    refrescar: () => obtenerJoyas(paginaActual)
  }))

  return (
    <div className="contendor-tabla">
      <table className="tabla">
        <thead className="thead-encabezado">
          <TrTable>
            <ThTable text="Código" />
            <ThTable text="Producto" />
            <ThTable text="Precio" />
            <ThTable text="Cantidad" />
            <ThTable text="Descripción" />
            <ThTable text="Acción" />
          </TrTable>
        </thead>

        <tbody>
          {joyas.length > 0 ? (
            joyas
              .sort((a, b) => Number(a.codigo) - Number(b.codigo))
              .map(joya => (
                <TrTable key={joya._id}>
                  <TdTable text={joya.codigo} />
                  <TdTable text={joya.producto} />
                  <TdTable text={`$${joya.precio}`} />
                  <TdTable
                    text={
                      <div
                        className={`cantidad-cell ${
                          joya.cantidad < 1 ? 'sin-stock' : ''
                        }`}
                      >
                        <button
                          className="btn-cantidad"
                          onClick={() =>
                            actualizarCantidad(
                              joya._id,
                              joya.cantidad - 1
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>

                        <span className="cantidad">
                          {joya.cantidad}
                        </span>

                        <button
                          className="btn-cantidad"
                          onClick={() =>
                            actualizarCantidad(
                              joya._id,
                              joya.cantidad + 1
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    }
                  />
                  <TdTable text={joya.descripcion} />
                  <TdTable
                    text={
                      <div className="acciones">
                        <button
                          className="btn-icono editar"
                          onClick={() => abrirModalEdicion(joya)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                          className="btn-icono eliminar"
                          onClick={() =>
                            confirmarEliminacion(joya._id)
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    }
                  />
                </TrTable>
              ))
          ) : (
            <tr>
              <td colSpan="6" className="no-resultados">
                No se encontró ningún resultado 😕
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPaginas > 1 && (
        <div className="paginacion">
          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              className={`btn-pagina ${
                paginaActual === i + 1 ? 'activa' : ''
              }`}
              onClick={() => cambiarPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <ConfirmModal
        visible={modalVisible}
        onConfirm={() => eliminarProducto(productoAEliminar)}
        onCancel={() => setModalVisible(false)}
        mensaje="¿Seguro que querés eliminar este producto?"
      />

      <EditProductModal
        visible={modalEditarVisible}
        producto={productoAEditar}
        onClose={() => setModalEditarVisible(false)}
        onUpdated={() => obtenerJoyas(paginaActual)}
      />
    </div>
  )
})

export default TableJoyas
