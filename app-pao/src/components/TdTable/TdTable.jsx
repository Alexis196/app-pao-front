import './TdTable.css'

const TdTable = ({ text }) => {
  return <td>
            <div className='div-td-table'>
                {text}
            </div>
        </td>;
};

export default TdTable