/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './index.css';
// import '../../assets/css/globals/globals.css';
import { Button, Form } from 'react-bootstrap';
import { reqtsApiForm } from '@/lib/utils';
import ImagesLogin from '@/components/auth/ImagesLogin';
import { RecoveryContext } from '@/context/RecoveryContext';
import Recovery from '@/components/auth/Recovery';
import Alert from '@/components/Alert';

async function loginUser(credentials: any) {
  return reqtsApiForm(
    'v1/login',
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

async function renderImage(params: any) {
  return reqtsApiForm(
    'v1/home',
    false,
    'POST',
    params,
    (data: any) => data,
    (error: any) => error
  )
    .then((resp) => resp)
    .catch((err) => {
      console.log(err);
    });
}

const Login = ({ setToken }: { setToken: any }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [logoArl, setLogoArl] = useState([]);
  const [subLogos, setSubLogos] = useState([]);
  const [urlLogo, setUrlLogo] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const { isActive, showRecovery } = useContext(RecoveryContext);

  const url_empresa = window.location.origin;

  useEffect(() => {
    const getImages = async () => {
      const rspImage = await renderImage({ url_empresa });
      setLogoArl(rspImage.RSP.logos_arl);
      setSubLogos(rspImage.RSP.sub_logos);
      setUrlLogo(rspImage.RSP.url_logo);
    };

    let isApiSuscribed = true;
    if (isApiSuscribed) {
      getImages();
    }
    return () => {
      isApiSuscribed = false;
    };
  }, [url_empresa]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const rspLogin = await loginUser({
      username,
      password,
      url_empresa,
    });

    if (rspLogin.STATUS) {
      setToken(rspLogin);
    } else {
      setErrorLogin(!errorLogin);
    }
  };

  const handleBoton = () => {
    showRecovery();
  };

  return (
    <div className="login-wrapper">
      <div className="initial">
        <ImagesLogin logoArl={logoArl} subLogos={subLogos} urlLogo={urlLogo} />
      </div>

      <div className="containerForm">
        <Alert
          show={errorLogin}
          onHide={setErrorLogin}
          titulo="No se puede ingresar"
          contenido="Usuario o contraseña incorrectos"
          tipo="error"
        />
        {!isActive ? (
          <Form onSubmit={handleSubmit} className="form-large">
            <h3 className="text-center mb-4">Inicia sesión</h3>
            <Form.Group className="mb-3 " controlId="formBasicUser">
              <Form.Control
                autoFocus
                className="borderInput"
                type="text"
                name="username"
                placeholder="Usuario"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicPassword">
              <Form.Control
                type="password"
                className="borderInput"
                name="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div style={{ textAlign: 'end' }}>
              <Button variant="link" onClick={handleBoton}>
                ¿Olvidaste tu contraseña?
              </Button>
            </div>

            <Button
              variant="warning"
              type="submit"
              className="w-100 borderInput p-2 ">
              Ingresar
            </Button>
          </Form>
        ) : (
          <Recovery />
        )}
      </div>
    </div>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
