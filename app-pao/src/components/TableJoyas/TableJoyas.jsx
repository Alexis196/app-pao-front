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
import { useState, useEffect } from 'react'

const TableJoyas = ({ filtro }) => {
  const [joyas, setJoyas] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/joyas')
      .then(res => setJoyas(res.data))
      .catch(err => console.error(err))
  }, [])

  const joyasFiltradas = joyas.filter(joya => {
    const producto = joya.producto ? joya.producto.toLowerCase() : ''
    const codigo = joya.codigo ? joya.codigo.toString().toLowerCase() : ''
    const filtroTexto = filtro ? filtro.toLowerCase() : '' // ✅ prevent undefined

    return producto.includes(filtroTexto) || codigo.includes(filtroTexto)
  })

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
          {joyasFiltradas.length > 0 ? (
            [...joyasFiltradas]
              .sort((a, b) => Number(a.codigo) - Number(b.codigo))
              .map((joya) => (
                <TrTable key={joya._id}>
                  <TdTable text={joya.codigo} />
                  <TdTable text={joya.producto} />
                  <TdTable text={`$${joya.precio}`} />
                  <TdTable
                    text={
                      <>
                        <button className="btn-editar"> - </button>
                        {joya.cantidad}
                        <button className="btn-editar"> + </button>
                      </>
                    }
                  />
                  <TdTable text={joya.descripcion} />
                  <TdTable
                    text={
                      <>
                        <button className="btn-editar">✏️</button>
                        <button className="btn-eliminar">🗑️</button>
                      </>
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
    </div>
  )
}

export default TableJoyas
