import './Filter.css'
import Search from '../Search/Search'

const Filter = ({ onSearch }) => {
  return (
    <>
      <Search onSearch={onSearch} />
    </>
  )
}

export default Filter
