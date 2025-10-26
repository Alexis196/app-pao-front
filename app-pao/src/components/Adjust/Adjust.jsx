import './Adjust.css'
import axios from 'axios'
import { useState } from 'react'

const Adjust = ({ onAjuste }) => {
  const [porcentaje, setPorcentaje] = useState(0)
  const [mensaje, setMensaje] = useState('')

  const aplicarAjuste = async () => {
    const valor = Number(porcentaje)
    if (isNaN(valor) || valor < 0) {
      setMensaje('⚠️ El porcentaje debe ser un número positivo')
      return
    }

    try {
      const res = await axios.patch('https://app-pao-back.onrender.com/api/joyas/aumento-precio', {
        porcentaje: valor
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
      <h3>Aumento masivo de precios</h3>
      <input
        type="number"
        min="0"
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
