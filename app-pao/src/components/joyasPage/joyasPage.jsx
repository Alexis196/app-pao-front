import { useState } from 'react'
import Search from '../Search/Search'
import TableJoyas from '../TableJoyas/TableJoyas'

const JoyasPage = () => {
  const [filtro, setFiltro] = useState('')

  return (
    <>
      <Search onSearch={setFiltro} />
      <TableJoyas filtro={filtro} />
    </>
  )
}

export default JoyasPage
