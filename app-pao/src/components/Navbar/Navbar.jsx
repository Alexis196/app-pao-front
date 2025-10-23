import './navbar.css';
import LogoCorazon from '../../assets/logo.webp'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className='contenedor-logo'>
        <img src={LogoCorazon} alt="Corazones Joyas Logo" className="navbar-logo" />
        <span className='nombre-empresa'>Corazón Rosa Joyitas</span>
      </div>
      <input
        type="text"
        name="buscador"
        id="buscador-joyas"
        placeholder="Buscar joyas..."
        className="navbar-buscador"
      />
      
    </div>
  );
};

export default Navbar;
