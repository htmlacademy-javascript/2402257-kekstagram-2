import { generateUserInterface } from './miniature.js';
import { showErrorMessage } from './error-message.js';
import './upload-form.js';
import { getData } from './api.js';
//ghdbtn
getData()
  .then((data) => generateUserInterface(data))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    showErrorMessage();
  });
