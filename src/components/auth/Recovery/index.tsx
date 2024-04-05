/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { reqtsApiForm } from '@/lib/utils';
import Alert from '@/components/Alert';
import { RecoveryContext } from '@/context/RecoveryContext';

async function recoveryUser(credentials: any) {
  return reqtsApiForm(
    'v1/recovery',
    false,
    'POST',
    credentials,
    (data: any) => data,
    (error: any) => error
  )
    .then((resp) => resp)
    .catch((err) => {
      console.log(err);
    });
}

const Recovery = () => {
  const [email, setEmail] = useState('');
  const [alertError, setAlertError] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [contenido, setContenido] = useState();
  const { showRecovery } = useContext(RecoveryContext);

  const url = window.location.origin;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const rspRecovery = await recoveryUser({
      email,
      url,
    });

    if (rspRecovery.STATUS) {
      setAlertSuccess(!alertSuccess);
      setContenido(rspRecovery.RSP);
    } else {
      setAlertError(!alertError);
      setContenido(rspRecovery.RSP);
    }
  };

  return (
    <>
      <Alert
        titulo="El correo no existe"
        contenido={contenido}
        show={alertError}
        onHide={setAlertError}
        tipo="error"
      />
      <Alert
        titulo="Correo enviado"
        contenido={contenido}
        show={alertSuccess}
        onHide={setAlertSuccess}
        tipo="success"
        evento={showRecovery}
      />

      <Form onSubmit={handleSubmit} className="form-large">
        <h3 className="text-center mb-4">Restablecer Contraseña</h3>
        <Form.Group className="mb-3 " controlId="formBasicUser">
          <Form.Control
            autoFocus
            className="borderInput"
            type="email"
            name="username"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <div style={{ textAlign: 'end' }}>
          <Button variant="link" onClick={showRecovery}>
            Iniciar Sesion
          </Button>
        </div>

        <Button
          variant="dark"
          type="submit"
          className="w-100 borderInput p-2"
          id="boton-enviar">
          Enviar
        </Button>
      </Form>
    </>
  );
};

export default Recovery;
