import './ConfirmModal.css'

const ConfirmModal = ({ visible, onConfirm, onCancel, mensaje }) => {
  if (!visible) return null

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <h3>Confirmar acción</h3>
        <p>{mensaje || '¿Estás seguro de que querés eliminar este producto?'}</p>

        <div className="confirm-modal-buttons">
          <button className="btn-cancelar" onClick={onCancel}>Cancelar</button>
          <button className="btn-confirmar" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
