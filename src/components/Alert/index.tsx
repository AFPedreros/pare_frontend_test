import { Button, Modal } from 'react-bootstrap';
import './index.css';
// import 'remixicon/fonts/remixicon.css'
// import verificado from '../../assets/img/iconos/verificado.gif'
// import advertencia from '../../assets/img/iconos/advertencia.gif'
// import wrong from '../../assets/img/iconos/x.gif'
//import { faExclamation } from '@fortawesome/free-solid-svg-icons';

// se reciben 5 parametros, en titulo se pone un texto, en contenido se pone un texto, show es para mostrar el alert, onHide es para esconderlo
// tipo recibe "success" para el caso de exito, "warning" para una advertencia, "error" para cuando algo esta mal y "confirm" es un warning para confirmar una accion

type AlertProps = {
  titulo: string;
  contenido: string;
  show: boolean;
  onHide: (value: boolean) => void;
  tipo: string;
  evento?: () => void;
};

const Alert = ({
  titulo,
  contenido,
  show,
  onHide,
  tipo,
  evento = null,
}: AlertProps) => {
  const handleBoton = () => {
    if (evento !== null) {
      evento();
      onHide(false);
    } else {
      onHide(false);
    }
  };

  return (
    <>
      <Modal show={show} centered onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          {tipo === 'success' ? (
            <div className="icono">
              <img className="icono2" src="{verificado}" alt="success"></img>
            </div>
          ) : tipo === 'warning' || tipo === 'confirm' ? (
            <div className="icono">
              <img className="icono2" src="{advertencia}" alt="warning"></img>
            </div>
          ) : tipo === 'error' ? (
            <div className="icono">
              <img className="icono2" src="{wrong}" alt="error"></img>
            </div>
          ) : null}
          <div className="texto">{contenido}</div>
        </Modal.Body>
        <Modal.Footer>
          {tipo === 'success' ||
          tipo === 'error' ||
          tipo === 'warning' ||
          tipo === '' ? (
            <Button variant="primary" onClick={handleBoton}>
              OK
            </Button>
          ) : (
            <>
              <Button variant="success" onClick={handleBoton}>
                Si
              </Button>
              <Button variant="secondary" onClick={() => onHide(false)}>
                No
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Alert;
