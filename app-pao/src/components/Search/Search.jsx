import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Search = ({ onSearch }) => {
   const handleChange = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div className="search-container">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="lupa" />
      <input
        type="text"
        placeholder="Buscar por nombre o código..."
        className="buscador"
        onChange={handleChange}
      />
    </div>
  )
}

export default Search
