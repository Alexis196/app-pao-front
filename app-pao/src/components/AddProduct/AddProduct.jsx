import './AddProduct.css'
import axios from 'axios'
import { useState } from 'react'

const AddProduct = ({ onAjuste }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    producto: '',
    precio: '',
    cantidad: '',
    descripcion: ''
  })

  const [mensaje, setMensaje] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validación básica
    if (!formData.codigo || !formData.producto || !formData.precio || !formData.cantidad) {
      setMensaje('⚠️ Todos los campos obligatorios deben estar completos.')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post('https://app-pao-back.onrender.com/api/joyas', {
        codigo: Number(formData.codigo),
        producto: formData.producto.trim(),
        precio: Number(formData.precio),
        cantidad: Number(formData.cantidad),
        descripcion: formData.descripcion.trim()
      })

      setMensaje(`✅ ${res.data.producto || 'Producto agregado correctamente'}`)
      setFormData({ codigo: '', producto: '', precio: '', cantidad: '', descripcion: '' })
      onAjuste?.() // refresca la tabla si está disponible
    } catch (err) {
      console.error(err)
      setMensaje('❌ Error al agregar el producto. Verifique los datos o si ya existe.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="add-product" onSubmit={handleSubmit}>

      <div className="input-group">
        <label>Código *</label>
        <input
          type="number"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          placeholder="Ej: 1001"
        />
      </div>

      <div className="input-group">
        <label>Producto *</label>
        <input
          type="text"
          name="producto"
          value={formData.producto}
          onChange={handleChange}
          placeholder="Ej: Anillo de plata"
        />
      </div>

      <div className="input-group">
        <label>Precio *</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          placeholder="Ej: 299.99"
          min="0"
          step="0.01"
        />
      </div>

      <div className="input-group">
        <label>Cantidad *</label>
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          placeholder="Ej: 5"
          min="0"
        />
      </div>

      <div className="input-group">
        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Detalles del producto..."
          rows="3"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Agregando...' : 'Agregar producto'}
      </button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  )
}

export default AddProduct
