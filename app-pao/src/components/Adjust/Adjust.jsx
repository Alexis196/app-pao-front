import './Adjust.css'
import axios from 'axios'
import { useState } from 'react'

const Adjust = ({ onAjuste }) => {
  const [porcentaje, setPorcentaje] = useState(0)
  const [mensaje, setMensaje] = useState('')

  const aplicarAjuste = async () => {
    try {
      const res = await axios.patch('http://localhost:3001/api/joyas/aumento-precio', {
        porcentaje: Number(porcentaje)
      })
      setMensaje(res.data.message)
      onAjuste?.() 
    } catch (err) {
      setMensaje('⚠️ Error al aplicar el ajuste de precios')
      console.error(err)
    }
  }

  return (
    <div className="aumento-precios">
      <h3>Ajuste masivo de precios</h3>
      <input
        type="number"
        placeholder="Porcentaje de aumento"
        value={porcentaje}
        onChange={(e) => setPorcentaje(e.target.value)}
      />
      <button onClick={aplicarAjuste}>Aplicar ajuste</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}

export default Adjust
