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
import { postUsersForm } from './api.js';

const initializers = {
  escKey: 'esc-button',
  submitButton: 'submit-button',
  closeButton: 'close-button',
};

const succesMessageSample = document.querySelector('#success').content;
const succesMessage = succesMessageSample.cloneNode(true);

const errorMessageSample = document.querySelector('#error').content;
const errorMessage = errorMessageSample.cloneNode(true);

const imgInput = document.querySelector('.img-upload__input');
const editFormOverlay = document.querySelector('.img-upload__overlay');
const editForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const closeButton = editForm.querySelector('.img-upload__cancel');
const hashtagInput = editForm.querySelector('.text__hashtags');
const commentInput = editForm.querySelector('.text__description');
const body = document.body;

const onOutsideInterfaceClick = (evt) => {
  if (
    evt.target.classList.contains('error') ||
    evt.target.classList.contains('error__button')
  ) {
    hideErorrMessage();
    document.removeEventListener('click', onOutsideInterfaceClick);
  }
  if (
    evt.target.classList.contains('success') ||
    evt.target.classList.contains('success__button')
  ) {
    hideSuccessMessage();
    document.removeEventListener('click', onOutsideInterfaceClick);
  }
};

const showErrorMessage = () => {
  body.querySelector('.error').classList.remove('hidden');
  document.addEventListener('click', onOutsideInterfaceClick);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function hideErorrMessage() {
  body.querySelector('.error').classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('keydown', onDocumentKeydown);
}

const showSuccesMessage = () => {
  body.querySelector('.success').classList.remove('hidden');
  document.addEventListener('click', onOutsideInterfaceClick);
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function hideSuccessMessage() {
  body.querySelector('.success').classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
}

const onCommentInputKeyDown = (evt) => {
  evt.stopPropagation();
};

const onHashtagInputKeyDown = (evt) => {
  evt.stopPropagation();
};

const removeEditFormListeners = (initializer) => {
  if (
    initializer === initializer.escKey &&
    initializer === initializer.closeButton
  ) {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
  commentInput.removeEventListener('keydown', onCommentInputKeyDown);
  hashtagInput.removeEventListener('keydown', onHashtagInputKeyDown);
  editForm.removeEventListener('submit', onEditFormSubmit);
};

const hideEditForm = () => {
  editFormOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const clearEditFormInputs = () => {
  editForm.reset();
};

const destroyEditForm = (initializer) => {
  resetFilter();
  destroyFilter();
  hideEditForm();
  removeEditFormListeners(initializer);
  destroyScaleButtons();
  clearEditFormInputs();
  resetUploadedImgScale();
  resetValidators();
  closeButton.removeEventListener('click', onCloseButtonClick);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const closeEditForm = () => {
  editForm.removeEventListener('submit', onEditFormSubmit);
  destroyEditForm(initializers.submitButton);
};

function onEditFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(editForm);

  if (setValidator()) {
    blockSubmitButton();
    postUsersForm(formData)
      .then((response) => {
        if (response.ok) {
          closeEditForm();
          showSuccesMessage();
        } else {
          throw new Error('Данные не отправлены!');
        }
      })
      .catch((err) => {
        if (err) {
          showErrorMessage();
        }
      })
      .finally(unblockSubmitButton);
  }
}

function onDocumentKeydownError(evt) {
  if (isEscapeKey(evt)) {
    hideErorrMessage();
    document.removeEventListener('click', onOutsideInterfaceClick);
  }
  document.removeEventListener('keydown', onDocumentKeydownError);
}

function onDocumentKeydownSuccess(evt) {
  if (isEscapeKey(evt)) {
    hideSuccessMessage();
    document.removeEventListener('click', onOutsideInterfaceClick);
  }
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    destroyEditForm(initializers.escKey);
    hideSuccessMessage();
    hideErorrMessage();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onCloseButtonClick() {
  destroyEditForm(initializers.closeButton);
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

const addSuccessMessageBlock = () => {
  body.appendChild(succesMessage);
};

const addErrorMessageBlock = () => {
  body.appendChild(errorMessage);
};

const onImgInputChange = () => {
  addErrorMessageBlock();
  addSuccessMessageBlock();
  addValidators();
  initFilter();
  initScaleButtons();
  showEditForm();
  addEditFormListeners();
};

imgInput.addEventListener('change', onImgInputChange);

export {};
