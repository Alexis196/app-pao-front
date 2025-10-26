import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Adjust from "../Adjust/Adjust";
import LowerPrices from "../LowerPrices/LowerPrices";
import AddProduct from "../AddProduct/AddProduct";
import ModalAction from "../ModalAction/ModalAction";
import "./ActionsDropdown.css";

const ActionsDropdown = ({ onAjuste }) => {
  const [open, setOpen] = useState(false);
  const [opcion, setOpcion] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelect = (option) => {
    setOpcion(option);
    setOpen(false);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setOpcion(null);
  };

  const handleAjusteYCerrar = async () => {
    // Llamamos al refresco desde el layout
    await onAjuste?.();
    handleCloseModal();
  };

  const renderContenido = () => {
    switch (opcion) {
      case "agregar":
        return <AddProduct onAjuste={onAjuste} />;
      case "aumentar":
        return <Adjust onAjuste={handleAjusteYCerrar} />;
      case "bajar":
        return <LowerPrices onAjuste={handleAjusteYCerrar} />;
      default:
        return null;
    }
  };

  return (
    <div className="actions-dropdown">
      <button className="btn-principal" onClick={() => setOpen(!open)}>
        Acciones <FontAwesomeIcon icon={faChevronDown} />
      </button>

      {open && (
        <ul className="menu-opciones">
          <li onClick={() => handleSelect("agregar")}>
            <FontAwesomeIcon icon={faPlus} /> Agregar producto
          </li>
          <li onClick={() => handleSelect("aumentar")}>
            <FontAwesomeIcon icon={faArrowUp} /> Aumentar precios
          </li>
          <li onClick={() => handleSelect("bajar")}>
            <FontAwesomeIcon icon={faArrowDown} /> Bajar precios
          </li>
        </ul>
      )}

      <ModalAction
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={
          opcion === "agregar"
            ? "Agregar producto"
            : opcion === "aumentar"
            ? "Aumentar precios"
            : opcion === "bajar"
            ? "Bajar precios"
            : ""
        }
      >
        {renderContenido()}
      </ModalAction>
    </div>
  );
};

export default ActionsDropdown;

