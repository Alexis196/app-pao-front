import './Filter.css'
import Search from '../Search/Search'

const Filter = ({ onSearch, onAjuste }) => {
  return (
    <div className='content-filter'>
      <div className='content-filter-search'>
        <Search onSearch={onSearch} />
      </div>
    </div>
  )
}

export default Filter


