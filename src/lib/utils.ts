import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import CryptoJS from 'crypto-js';
import { DATA_SESSION, API } from '@/env';

/**
 * Permite ejecutar peticiones al API, recibe el
 * el Url -> conexion del api, params -> parametros de envio
 * mSuccess -> metodo a ejecutar si todo funciona,
 * mError -> metodo a ejecutar si se gnerera error
 * multipart envio de archivos
 **/

export function reqtsApiForm(
  urlApi,
  withToken = false,
  method,
  params,
  mSuccess,
  mError,
  multipart = false
) {
  var formBody = multipart ? new FormData() : [];
  var headers = {};
  let token = '';

  if (withToken) {
    let response = getVarSsn();
    token = response.TCOD;
  }

  if (multipart) {
    for (const name in params) {
      formBody.append(name, params[name]);
    }
  } else {
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
  }

  if (token !== '') {
    headers = { Authorization: `Bearer ${token}` };
    if (!multipart) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
  } else {
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  let payloadFetch = {
    method: method,
    headers: headers,
    timeout: 30000,
  };

  if (params !== null && Object.keys(params).length > 0 && method !== 'GET') {
    payloadFetch['body'] = formBody;
  }

  return fetch(API + urlApi, payloadFetch)
    .then((response) => response.json())
    .then((response) => {
      return mSuccess(response);
    })
    .catch((err) => {
      return mError(err);
    });
}

export function reqtsApiGetText(
  urlApi,
  withToken = false,
  method,
  params,
  mSuccess,
  mError,
  multipart = false
) {
  var formBody = multipart ? new FormData() : [];
  var headers = {};
  let token = '';

  if (withToken) {
    let response = getVarSsn();
    token = response.TCOD;
  }

  if (multipart) {
    for (const name in params) {
      formBody.append(name, params[name]);
    }
  } else {
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
  }

  if (token !== '') {
    headers = { Authorization: `Bearer ${token}` };
    if (!multipart) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
  } else {
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  let payloadFetch = {
    method: method,
    headers: headers,
    timeout: 30000,
  };

  if (params !== null && Object.keys(params).length > 0 && method !== 'GET') {
    payloadFetch['body'] = formBody;
  }

  return fetch(API + urlApi, payloadFetch)
    .then((response) => response.text())
    .then((response) => {
      return mSuccess(response);
    })
    .catch((err) => {
      return mError(err);
    });
}

/**
 *
 * @param {*} item objJson principal
 * @param {*} level attribute array
 * @param {*} index position or inex
 * @param {*} obj item json to modify
 * @param {*} action new, update, delete
 * @returns
 */
export function manageJsonWithAttrArray(item, level, index, obj, action) {
  if (action === 'new') {
    return {
      ...item,
      [level]:
        item[level] === null || item[level].length === 0
          ? [obj]
          : [...item[level], obj],
    };
  } else if (action === 'update') {
    return {
      ...item,
      [level]:
        index === 0 && item[level].length === 1
          ? [obj]
          : index === 0
            ? [obj, ...item[level].slice(1, item[level].length)]
            : index === item[level].length - 1
              ? [...item[level].slice(0, item[level].length - 1), obj]
              : [
                  ...item[level].slice(0, index),
                  obj,
                  ...item[level].slice(index + 1, item[level].length),
                ],
    };
  } else {
    return {
      ...item,
      [level]:
        item[level].length === 1
          ? []
          : index === 0
            ? [...item[level].slice(1, item[level].length)]
            : index === item[level].length - 1
              ? [...item[level].slice(0, item[level].length - 1)]
              : [
                  ...item[level].slice(0, index),
                  ...item[level].slice(index + 1, item[level].length),
                ],
    };
  }
}

export function getVarSsn() {
  let session = localStorage.getItem(DATA_SESSION);
  let rsp = null;
  if (session !== undefined && session !== null) {
    try {
      rsp = unwrap(session, getTag());
      return rsp;
    } catch (error) {
      cleanVarSsn();
    }
  }
  return rsp;
}

export function wrap(message, info) {
  return CryptoJS.AES.encrypt(message, info).toString();
}

export function unwrap(message, info) {
  var bytes = CryptoJS.AES.decrypt(message, info);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export function setLogin(dt) {
  const tag = getTag();
  const data = wrap(JSON.stringify(dt), tag);
  localStorage.setItem(DATA_SESSION, data);
}

export function getTag() {
  let date = new Date();
  let message =
    'j2ECY#*whX^---xygt--onti#dM%WR3xGgW' +
    date.getDay() +
    '*' +
    date.getMonth() +
    '*' +
    date.getFullYear();
  let nonce = '_>_';
  let path = '/';
  const privateKey = '@insYz#*whX^8N4!92uz2htv#dM%W45gs7tGgW';
  const hashDigest = sha256(nonce + message);
  return Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
}

export function cleanVarSsn() {
  localStorage.removeItem(DATA_SESSION);
  window.location.reload();
}
