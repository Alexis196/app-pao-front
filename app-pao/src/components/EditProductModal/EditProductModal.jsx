import './EditProductModal.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditProductModal = ({ visible, onClose, producto, onUpdated }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    producto: '',
    precio: '',
    cantidad: '',
    descripcion: ''
  })

  useEffect(() => {
    if (producto) {
      setFormData({
        codigo: producto.codigo || '',
        producto: producto.producto || '',
        precio: producto.precio || '',
        cantidad: producto.cantidad || '',
        descripcion: producto.descripcion || ''
      })
    }
  }, [producto])

  if (!visible) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const cambios = {}

      // Solo enviar los campos que realmente cambiaron
      Object.keys(formData).forEach(key => {
        if (formData[key] !== producto[key]) {
          cambios[key] = formData[key]
        }
      })

      if (Object.keys(cambios).length === 0) {
        alert('No hiciste ningún cambio.')
        return
      }

      await axios.put(`https://app-pao-back.onrender.com/api/joyas/${producto._id}`, cambios)
      onUpdated() // refresca tabla
      onClose()
    } catch (err) {
      console.error('Error al actualizar producto:', err)
      alert('Error al guardar los cambios.')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Editar producto</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <label>Código:</label>
          <input
            type="number"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
          />

          <label>Producto:</label>
          <input
            type="text"
            name="producto"
            value={formData.producto}
            onChange={handleChange}
          />

          <label>Precio:</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
          />

          <label>Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
          />

          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductModal
