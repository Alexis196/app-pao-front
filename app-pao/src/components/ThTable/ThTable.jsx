import './ThTable.css'
const ThTable = ({ text }) => {
    return (
        <th>
            <div className="div-th-table">
                {text}
            </div>
        </th>
    )
}

export default ThTable