import { isEscapeKey } from './util.js';
import {
  addButtonScaleListeners,
  removeButtonScaleListeners,
  resetUploadedImgScale,
} from './scale-buttons-form.js';
import {
  addFiltersContainerListener,
  removeFiltersContainerListener,
  resetFilter,
} from './filter-form.js';
import { addValidators, resetValidators, pristine } from './validation-form.js';

const imgInput = document.querySelector('.img-upload__input');
const editFormOverlay = document.querySelector('.img-upload__overlay');
const editForm = document.querySelector('.img-upload__form');
const closeButton = editForm.querySelector('.img-upload__cancel');
const hashtagInput = editForm.querySelector('.text__hashtags');
const commentInput = editForm.querySelector('.text__description');
const body = document.body;

const onCommentInputKeyDown = (evt) => {
  evt.stopPropagation();
};

const onHashtagInputKeyDown = (evt) => {
  evt.stopPropagation();
};

const removeEditFormListeners = () => {
  commentInput.removeEventListener('keydown', onCommentInputKeyDown);
  hashtagInput.removeEventListener('keydown', onHashtagInputKeyDown);
  document.removeEventListener('keydown', onDocumentKeydown);
  editForm.removeEventListener('submit', onEditFormSubmit); //обработчики поменять название
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
  removeFiltersContainerListener();
  hideEditForm();
  removeEditFormListeners();
  removeButtonScaleListeners();
  clearEditFormInputs();
  resetUploadedImgScale();
  resetValidators();
  closeButton.removeEventListener('click', destroyEditForm);
};

function onEditFormSubmit(evt) {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    editForm.removeEventListener('submit', onEditFormSubmit);
    destroyEditForm();
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    destroyEditForm();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
}

const addEditFormListeners = () => {
  closeButton.addEventListener('click', destroyEditForm);
  editForm.addEventListener('submit', onEditFormSubmit);
  document.addEventListener('keydown', onDocumentKeydown);
  commentInput.addEventListener('keydown', onCommentInputKeyDown);
  hashtagInput.addEventListener('keydown', onHashtagInputKeyDown);
};

const showEditForm = () => {
  editFormOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

const onImgInputChange = () => {
  addValidators();
  addFiltersContainerListener();
  addButtonScaleListeners();
  showEditForm();
  addEditFormListeners();
};

imgInput.addEventListener('change', onImgInputChange);

export {};
