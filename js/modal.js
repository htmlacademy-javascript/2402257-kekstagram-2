import {
  createModalContent,
  closeButton,
  modal,
  commentsBlock,
  picturesContainer,
} from './modalcontent.js';
import { isEscapeKey } from './util.js';

const closeModal = () => {
  modal.classList.add('hidden');
  commentsBlock.innerHTML = '';
};

picturesContainer.addEventListener('click', createModalContent);

closeButton.addEventListener('click', closeModal);

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
  }
});
