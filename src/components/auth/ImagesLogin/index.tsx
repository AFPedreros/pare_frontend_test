/* eslint-disable @typescript-eslint/no-explicit-any */
import './index.css';
import { API } from '@/env';
import { Image } from 'react-bootstrap';
// import pareLogin from '../../assets/images/logo-pare-login.png';
// import logoCorprevenir from '../../assets/images/logoCorprevenir.png';
const ImagesLogin = ({
  logoArl,
  subLogos,
  urlLogo,
}: {
  logoArl: any;
  subLogos: any;
  urlLogo: any;
}) => {
  return (
    <div className="sectionImage">
      <div className="logo-princ">
        <Image
          src="/images/logo-pare-login.png"
          alt="pare-login"
          loading="lazy"
        />
      </div>

      {logoArl !== undefined &&
      logoArl !== null &&
      logoArl !== 'null' &&
      logoArl.length > 0 ? (
        <div className="mainImages">
          {logoArl.map((index: any) => (
            <Image
              key={index}
              src={API + logoArl[index].url_logo}
              alt="arl"
              loading="lazy"
            />
          ))}
        </div>
      ) : null}

      {subLogos !== undefined &&
      subLogos !== null &&
      subLogos !== 'null' &&
      subLogos.length > 0 ? (
        <div className="sublogos">
          <div className="superiorSublogs">
            {subLogos.map((index: any) => (
              <Image
                className="sublogos-imagen"
                key={index}
                src={API + subLogos[index].url_logo}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      ) : null}

      {urlLogo != '' && (
        <div className="empresa">
          <Image src={API + urlLogo} loading="lazy" />
        </div>
      )}
      <div className="logoCorprevenir">
        <Image src="/images/logoCorprevenir.png" loading="lazy" />
      </div>
    </div>
  );
};

export default ImagesLogin;
