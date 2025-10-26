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

// import './Filter.css'

// import { useState } from 'react'
// import Search from '../Search/Search'
// // import Select from '../Select/Select'
// import Button from '../Button/Button'
// import TableJoyas from '../TableJoyas/TableJoyas'
// import Adjust from '../Adjust/Adjust'

// const Filter = () => {
//   const [filtro, setFiltro] = useState('')

//   return (
//     <div>
//       <div className='content-filter'>
//         <div className='content-filter-search'>

//           <Search onSearch={setFiltro} />
//           <Adjust />
//         </div>

//         <Button text="Agregar producto" />
//       </div>

//       <TableJoyas filtro={filtro} />
//     </div>
//   )
// }

// export default Filter

import './Filter.css'
import Search from '../Search/Search'
import Button from '../Button/Button'
import ActionsDropdown from '../ActionsDropdown/ActionsDropdown'
// import Adjust from '../Adjust/Adjust'

const Filter = ({ onSearch, onAjuste }) => {
  return (
    <div className='content-filter'>
      <div className='content-filter-search'>
        <Search onSearch={onSearch} />
        {/* <Adjust onAjuste={onAjuste} />  */}
      </div>

      {/* <ActionsDropdown onAjuste={onAjuste} /> */}
      {/* <Button text="Agregar producto" /> */}
    </div>
  )
}

export default Filter


