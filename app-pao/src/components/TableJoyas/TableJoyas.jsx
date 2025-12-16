import './TableJoyas.css'
import TrTable from '../TrTable/TrTable'
import ThTable from '../ThTable/ThTable'
import TdTable from '../TdTable/TdTable'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import EditProductModal from '../EditProductModal/EditProductModal'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faTrash,
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const TableJoyas = forwardRef(
  ({ joyas = [], paginaActual, totalPaginas, onPageChange }, ref) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [productoAEliminar, setProductoAEliminar] = useState(null)

    const [modalEditarVisible, setModalEditarVisible] = useState(false)
    const [productoAEditar, setProductoAEditar] = useState(null)

    const actualizarCantidad = async (id, nuevaCantidad) => {
      if (nuevaCantidad < 0) return

      try {
        await axios.put(
          `https://app-pao-back.onrender.com/api/joyas/${id}`,
          { cantidad: nuevaCantidad }
        )

        onPageChange(paginaActual)
      } catch (err) {
        console.error('Error al actualizar cantidad:', err)
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
        onPageChange(paginaActual)
      } catch (err) {
        console.error('Error al eliminar:', err)
      } finally {
        setModalVisible(false)
        setProductoAEliminar(null)
      }
    }

    const abrirModalEdicion = (producto) => {
      setProductoAEditar(producto)
      setModalEditarVisible(true)
    }

    useImperativeHandle(ref, () => ({
      refrescar: () => onPageChange(paginaActual)
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
                .map((joya) => (
                  <TrTable key={joya._id}>
                    <TdTable text={joya.codigo} />
                    <TdTable text={joya.producto} />
                    <TdTable text={`$${joya.precio}`} />
                    <TdTable
                      text={
                        <div className="cantidad-cell">
                          <button
                            onClick={() =>
                              actualizarCantidad(
                                joya._id,
                                joya.cantidad - 1
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>

                          <span className="cantidad-span">{joya.cantidad}</span>

                          <button
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
                            onClick={() => abrirModalEdicion(joya)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
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
                onClick={() => onPageChange(i + 1)}
                className={`btn-pagina ${
                  paginaActual === i + 1 ? 'activa' : ''
                }`}
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
          onUpdated={() => onPageChange(paginaActual)}
        />
      </div>
    )
  }
)

export default TableJoyas
