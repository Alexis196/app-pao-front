import'./TrTable.css'
import React from 'react'

const TrTable = ({ children }) => {
  return (
    <tr>
      {React.Children.toArray(children)}
    </tr>
  )
}

export default TrTable
