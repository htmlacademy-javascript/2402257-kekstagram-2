import { isEscapeKey } from './util.js';
import {
  initScaleButtons,
  destroyScaleButtons,
  resetUploadedImgScale,
} from './scale-buttons-form.js';
import { initFilter, destroyFilter, resetFilter } from './filter-form.js';
import {
  addValidators,
  resetValidators,
  setValidator,
} from './validation-form.js';
import { sendData } from './api.js';

const SubmitButtonText = {
  IDLE: 'ПУБЛИКУЮ...',
  SENDING: 'ОПУБЛИКОВАТЬ',
};

const imgInput = document.querySelector('.img-upload__input');
const editFormOverlay = document.querySelector('.img-upload__overlay');
const editForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const closeButton = editForm.querySelector('.img-upload__cancel');
const hashtagInput = editForm.querySelector('.text__hashtags');
const commentInput = editForm.querySelector('.text__description');
const body = document.body;

const onDocumentClick = (evt) => {
  if (
    evt.target.classList.contains('error') ||
    evt.target.classList.contains('error__button')
  ) {
    hideErorrMessage();
    document.removeEventListener('click', onDocumentClick);
  }
  if (
    evt.target.classList.contains('success') ||
    evt.target.classList.contains('success__button')
  ) {
    hideSuccessMessage();
    document.removeEventListener('click', onDocumentClick);
  }
};

const showErrorMessage = () => {
  addErrorMessageBlock();
  document.addEventListener('click', onDocumentClick);
};

function hideErorrMessage() {
  const errorMessageBlock = document.querySelector('.error');
  body.removeChild(errorMessageBlock);
  document.addEventListener('keydown', onDocumentKeydown);
}

const showSuccesMessage = () => {
  addSuccessMessageBlock();
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

function hideSuccessMessage() {
  const succesMessageBlock = document.querySelector('.success');
  body.removeChild(succesMessageBlock);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onCommentInputKeyDown = (evt) => {
  evt.stopPropagation();
};

const onHashtagInputKeyDown = (evt) => {
  evt.stopPropagation();
};

const removeEditFormListeners = () => {
  commentInput.removeEventListener('keydown', onCommentInputKeyDown);
  hashtagInput.removeEventListener('keydown', onHashtagInputKeyDown);
  editForm.removeEventListener('submit', onEditFormSubmit);
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const hideEditForm = () => {
  editFormOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const clearEditFormInputs = () => {
  editForm.reset();
};

const destroyEditForm = () => {
  resetFilter();
  destroyFilter();
  hideEditForm();
  removeEditFormListeners();
  destroyScaleButtons();
  clearEditFormInputs();
  resetUploadedImgScale();
  resetValidators();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const closeEditForm = () => {
  editForm.removeEventListener('submit', onEditFormSubmit);
  destroyEditForm();
};

function onEditFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(editForm);

  if (setValidator()) {
    blockSubmitButton();
    sendData(formData)
      .then(() => {
        closeEditForm();
        showSuccesMessage();
        editForm.reset();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(unblockSubmitButton);
  }
}

const destroyModalMessage = () => {
  if (!document.contains(body.querySelector('.error'))) {
    destroyEditForm();
  }
  if (document.contains(body.querySelector('.error'))) {
    hideErorrMessage();
  }
  if (document.contains(body.querySelector('.success'))) {
    hideSuccessMessage();
    destroyEditForm();
  }
};
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    destroyModalMessage();
  }
}

function onCloseButtonClick() {
  destroyEditForm();
}

const addEditFormListeners = () => {
  closeButton.addEventListener('click', onCloseButtonClick);
  editForm.addEventListener('submit', onEditFormSubmit);
  document.addEventListener('keydown', onDocumentKeydown);
  commentInput.addEventListener('keydown', onCommentInputKeyDown);
  hashtagInput.addEventListener('keydown', onHashtagInputKeyDown);
};

const showEditForm = () => {
  editFormOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

function addSuccessMessageBlock() {
  const succesMessageSample = document.querySelector('#success').content;
  const succesMessage = succesMessageSample.cloneNode(true);
  body.appendChild(succesMessage);
}

function addErrorMessageBlock() {
  const errorMessageSample = document.querySelector('#error').content;
  const errorMessage = errorMessageSample.cloneNode(true);
  body.appendChild(errorMessage);
}

const onImgInputChange = () => {
  addValidators();
  initFilter();
  initScaleButtons();
  showEditForm();
  addEditFormListeners();
};

imgInput.addEventListener('change', onImgInputChange);

export {};
