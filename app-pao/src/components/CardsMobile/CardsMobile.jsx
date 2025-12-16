import './CardsMobile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import EditProductModal from '../EditProductModal/EditProductModal'
import { useState } from 'react'

const CardsMobile = ({
  joyas,
  paginaActual,
  totalPaginas,
  onPageChange
}) => {
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false)
  const [productoAEliminar, setProductoAEliminar] = useState(null)

  const [modalEditarVisible, setModalEditarVisible] = useState(false)
  const [productoAEditar, setProductoAEditar] = useState(null)

  const confirmarEliminacion = (id) => {
    setProductoAEliminar(id)
    setModalEliminarVisible(true)
  }

  const abrirModalEdicion = (producto) => {
    setProductoAEditar(producto)
    setModalEditarVisible(true)
  }

  return (
    <div className="cards-container">
      {joyas.length > 0 ? (
        <>
          {joyas
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
        </>
      ) : (
        <p className="no-resultados">
          No se encontraron productos 😕
        </p>
      )}

      <ConfirmModal
        visible={modalEliminarVisible}
        onConfirm={() => setModalEliminarVisible(false)}
        onCancel={() => setModalEliminarVisible(false)}
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

export default CardsMobile
