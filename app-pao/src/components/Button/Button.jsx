import './Button.css'

const Button = ({ text, onClick }) => {
  return (
    <div className="button-container">
      <button className="btn" onClick={onClick}>
        {text}
      </button>
    </div>
  )
}

export default Button
