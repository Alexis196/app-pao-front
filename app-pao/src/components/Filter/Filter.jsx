// import './Filter.css'

// import Search from '../search/search'
// import Select from '../Select/Select'
// import Button from '../Button/Button'

// const Filter = () => {
//   return (
//     <div className='content-filter'>
//         <div className='content-filter-search'>
//             <Search />
//             <span>Tipo: </span>
//             <Select />
//         </div>
//         <Button text="Agregar producto" />
//     </div>
//   )
// }

// export default Filter

import './Filter.css'

import { useState } from 'react'
import Search from '../Search/Search'
// import Select from '../Select/Select'
import Button from '../Button/Button'
import TableJoyas from '../TableJoyas/TableJoyas'

const Filter = () => {
  const [filtro, setFiltro] = useState('')

  return (
    <div>
      <div className='content-filter'>
        <div className='content-filter-search'>

          <Search onSearch={setFiltro} />
          {/* <span>Tipo: </span>
          <Select /> */}
        </div>

        <Button text="Agregar producto" />
      </div>

      <TableJoyas filtro={filtro} />
    </div>
  )
}

export default Filter
