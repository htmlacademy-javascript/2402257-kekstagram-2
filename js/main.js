import {
  generateUserInterface,
  initPostsFilterInterface,
  renderFilteredPosts,
} from './miniature.js';
import { showErrorMessage } from './error-message.js';
import './upload-form.js';
import { debounce } from './util.js';
import { getData } from './api.js';
import './user-photo-upload.js';

const RERENDER_DELAY = 500;

getData()
  .then((data) => {
    generateUserInterface(data);
    initPostsFilterInterface(
      debounce(() => {
        renderFilteredPosts();
      }, RERENDER_DELAY)
    );
  })
  .catch(() => {
    showErrorMessage();
  });
