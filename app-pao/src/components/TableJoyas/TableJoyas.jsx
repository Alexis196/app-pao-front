// import './TableJoyas.css'
// import TrTable from '../TrTable/TrTable'
// import ThTable from '../ThTable/ThTable'
// import TdTable from '../TdTable/TdTable'

// import axios from 'axios'
// import { useState, useEffect } from 'react'

// const TableJoyas = () => {
//     const [joyas, setJoyas] = (useState([]))

//     useEffect(() => {
//         axios.get('http://localhost:3001/api/joyas')
//             .then(res => {
//                 setJoyas(res.data)
//             })
//             .catch(err => console.log(err))
//     }, [])

//     return (
//         <div className='contendor-tabla'>
//             <table className='tabla'>
//                 <thead className='thead-encabezado'>
//                     <TrTable>
//                         <ThTable text="Código"></ThTable>
//                         <ThTable text="Producto"></ThTable>
//                         <ThTable text="Precio"></ThTable>
//                         <ThTable text="Cantindad"></ThTable>
//                         <ThTable text="Descripción"></ThTable>
//                         <ThTable text="Acción"></ThTable>
//                     </TrTable>
//                 </thead>
//                 <tbody>
//                     {[...joyas]
//                         .sort((a, b) => a.codigo - b.codigo)
//                         .map((joya) => (
//                             <TrTable key={joya._id}>
//                                 <TdTable text={joya.codigo} />
//                                 <TdTable text={joya.producto} />
//                                 <TdTable text={`$${joya.precio}`} />
//                                 <TdTable
//                                     text={
//                                         <>
//                                             <button className="btn-editar"> - </button>
//                                             {joya.cantidad}
//                                             <button className="btn-editar"> + </button>
//                                         </>
//                                     }
//                                 />
//                                 <TdTable text={joya.descripcion} />
//                                 <TdTable
//                                     text={
//                                         <>
//                                             <button className="btn-editar">✏️</button>
//                                             <button className="btn-eliminar">🗑️</button>
//                                         </>
//                                     }
//                                 />
//                             </TrTable>
//                         ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default TableJoyas

import './TableJoyas.css'
import TrTable from '../TrTable/TrTable'
import ThTable from '../ThTable/ThTable'
import TdTable from '../TdTable/TdTable'
import axios from 'axios'
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const TableJoyas = forwardRef(({ filtro }, ref) => {
  const [joyas, setJoyas] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const joyasPorPagina = 15

  useEffect(() => {
    obtenerJoyas()
  }, [])

  const obtenerJoyas = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/joyas')
      setJoyas(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const actualizarCantidad = async (id, nuevaCantidad) => {
    try {
      if (nuevaCantidad < 0) return
      await axios.put(`http://localhost:3001/api/joyas/${id}`, { cantidad: nuevaCantidad })
      setJoyas(prev =>
        prev.map(j => (j._id === id ? { ...j, cantidad: nuevaCantidad } : j))
      )
    } catch (err) {
      console.error('Error al actualizar la cantidad:', err)
    }
  }

  const joyasFiltradas = joyas.filter(joya => {
    const producto = joya.producto ? joya.producto.toLowerCase() : ''
    const codigo = joya.codigo ? joya.codigo.toString().toLowerCase() : ''
    const filtroTexto = filtro ? filtro.toLowerCase() : ''
    return producto.includes(filtroTexto) || codigo.includes(filtroTexto)
  })

  const indiceUltima = paginaActual * joyasPorPagina
  const indicePrimera = indiceUltima - joyasPorPagina
  const joyasPaginadas = joyasFiltradas.slice(indicePrimera, indiceUltima)
  const totalPaginas = Math.ceil(joyasFiltradas.length / joyasPorPagina)

  const cambiarPagina = (numero) => setPaginaActual(numero)

  useImperativeHandle(ref, () => ({
    refrescar: obtenerJoyas
  }))

  return (
    <div className='contendor-tabla'>
      <table className='tabla'>
        <thead className='thead-encabezado'>
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
          {joyasPaginadas.length > 0 ? (
            joyasPaginadas
              .sort((a, b) => Number(a.codigo) - Number(b.codigo))
              .map((joya) => (
                <TrTable key={joya._id}>
                  <TdTable text={joya.codigo} />
                  <TdTable text={joya.producto} />
                  <TdTable text={`$${joya.precio}`} />

                  <TdTable
                    text={
                      <div className={`cantidad-cell ${joya.cantidad < 1 ? 'sin-stock' : ''}`}>
                        <button
                          className="btn-cantidad"
                          onClick={() => actualizarCantidad(joya._id, joya.cantidad - 1)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="cantidad">{joya.cantidad}</span>
                        <button
                          className="btn-cantidad"
                          onClick={() => actualizarCantidad(joya._id, joya.cantidad + 1)}
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
                        <button className="btn-icono editar">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button className="btn-icono eliminar">
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
              onClick={() => cambiarPagina(i + 1)}
              className={`btn-pagina ${paginaActual === i + 1 ? 'activa' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

export default TableJoyas

