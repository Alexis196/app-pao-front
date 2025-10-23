import './TableJoyas.css'
import TrTable from '../TrTable/TrTable'
import ThTable from '../ThTable/ThTable'
import TdTable from '../TdTable/TdTable'

import axios from 'axios'
import { useState, useEffect } from 'react'

const TableJoyas = () => {
    const [joyas, setJoyas] = (useState([]))

    useEffect(() => {
        axios.get('http://localhost:3001/api/joyas')
            .then(res => {
                setJoyas(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='contendor-tabla'>
            <table className='tabla'>
                <thead className='thead-encabezado'>  
                    <TrTable>
                        <ThTable text="Producto"></ThTable>
                        <ThTable text="Precio"></ThTable>
                        <ThTable text="Cantindad"></ThTable>
                        <ThTable text="Descripción"></ThTable>
                        <ThTable text="Acción"></ThTable>
                    </TrTable>
                </thead>
                <tbody>
                    {joyas.map((joya) => (
                        <TrTable key={joya._id}>
                            <TdTable text={joya.producto} />
                            <TdTable text={

                                `$${joya.precio}`

                            } />
                            <TdTable text={
                                <>
                                    <button className="btn-editar"> - </button>
                                    {joya.cantidad}
                                    <button className="btn-editar"> + </button>
                                </>
                            } />
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
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableJoyas