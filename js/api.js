import { showErrorMessage } from './error-message.js';

const SHOW_ERROR_TIME = 5000;

const ErrorTemplateId = {
  DATA: 'data-error',
};

const ErrorClass = {
  DATA: '.data-error',
};

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }
      return response.json();
    })
    .catch(() => {
      if (method === Method.GET) {
        showErrorMessage(
          ErrorTemplateId.DATA,
          ErrorClass.DATA,
          SHOW_ERROR_TIME
        );
      } else {
        throw new Error(errorText);
      }
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) =>
  load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
