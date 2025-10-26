import './LowerPrices.css'
import axios from 'axios'
import { useState } from 'react'

const LowerPrices = ({ onAjuste }) => {
  const [porcentaje, setPorcentaje] = useState(0)
  const [mensaje, setMensaje] = useState('')

  const aplicarBaja = async () => {
    const valor = Number(porcentaje)
    if (isNaN(valor) || valor < 0) {
      setMensaje('⚠️ El porcentaje debe ser un número positivo')
      return
    }

    try {
      const res = await axios.patch('https://app-pao-back.onrender.com/api/joyas/bajar-precio', {
        porcentaje: valor
      })
      setMensaje(res.data.message)
      onAjuste?.()
    } catch (err) {
      setMensaje('⚠️ Error al aplicar la baja de precios')
      console.error(err)
    }
  }

  return (
    <div className="baja-precios">
      <h3>Baja masiva de precios</h3>
      <input
        type="number"
        min="0"
        placeholder="Porcentaje de baja"
        value={porcentaje}
        onChange={(e) => setPorcentaje(e.target.value)}
      />
      <button onClick={aplicarBaja}>Aplicar baja</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}

export default LowerPrices
