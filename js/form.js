import { isEscapeKey } from './util.js';
import {
  addButtonScaleListeners,
  removeButtonScaleListeners,
  resetUploadedImgScale,
} from './scalebuttons.js';
import {
  addFiltersContainerListener,
  removeFiltersContainerListener,
  resetFilter,
} from './filter.js';
const COMMENT_LENGTH_LIMIT = 140;
const MAX_QUANTITY_OF_HASHTAGS = 5;

const validationsErrorText = {
  INVALID_QUANTITY_OF_HASHTAGS: 'Неверное кол-во Хэштегов! ',
  INVALID_REGULAR_HASHTAGS: 'Хэштеги невалидны! ',
  INVALID_DUPLICATED_HASHTAGS: 'Хэштеги повторяются!',
  INVALID_LENGTH_OF_COMMENTS: 'Длина комментария привышает 140 символов!',
};

const imgInput = document.querySelector('.img-upload__input');
const editFormOverlay = document.querySelector('.img-upload__overlay');
const editForm = document.querySelector('.img-upload__form');
const closeButton = editForm.querySelector('.img-upload__cancel');
const hashtagInput = editForm.querySelector('.text__hashtags');
const commentInput = editForm.querySelector('.text__description');
const body = document.body;
const regular = /^#[a-zа-яё0-9]{1,19}$/i;

const separateHashtags = (input) =>
  input.value.split(' ').filter((hash) => Boolean(hash));

const checkCommentLimit = () =>
  !(commentInput.value.length > COMMENT_LENGTH_LIMIT);

const checkHashtagRegular = (hashtag) => regular.test(hashtag);

const checkHashtagsRegularValidation = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    if (checkHashtagRegular(hashtags[i]) === false) {
      return validationsErrorText.INVALID_REGULAR_HASHTAGS;
    }
  }
};

const checkHashtagsLengthValidation = (hashtags) => {
  if (hashtags.length <= MAX_QUANTITY_OF_HASHTAGS === false) {
    return validationsErrorText.INVALID_QUANTITY_OF_HASHTAGS;
  }
};
const checkDuplicatedHashtagsValidation = (hashtags) => {
  if (!(hashtags.length === new Set(hashtags).size)) {
    return validationsErrorText.INVALID_DUPLICATED_HASHTAGS;
  }
};
const validations = [
  checkHashtagsLengthValidation,
  checkHashtagsRegularValidation,
  checkDuplicatedHashtagsValidation,
];

const getErrorMessage = () => {
  const hashtags = separateHashtags(hashtagInput);

  const result = validations.reduce((acc, validator) => {
    const message = validator(hashtags);
    return message ? [...acc, message].join('') : acc;
  }, []);
  return result;
};
const validateHashtags = () => {
  const errorMessage = getErrorMessage();
  return errorMessage.length === 0;
};

const pristine = new Pristine(editForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtagInput, validateHashtags, getErrorMessage);

pristine.addValidator(
  commentInput,
  checkCommentLimit,
  validationsErrorText.INVALID_LENGTH_OF_COMMENTS
);

const onInputKeyDown = (evt) => {
  evt.stopPropagation();
};

const removeEditFormListeners = () => {
  commentInput.removeEventListener('keydown', onInputKeyDown);
  hashtagInput.removeEventListener('keydown', onInputKeyDown);
  document.removeEventListener('keydown', onDocumentKeydown);
  editForm.removeEventListener('submit', onEditFormSubmit);
};

const hideEditForm = () => {
  editFormOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const clearEditFormInputs = () => {
  hashtagInput.value = '';
  commentInput.value = '';
};

const destroyEditForm = () => {
  resetFilter();
  removeFiltersContainerListener();
  hideEditForm();
  removeEditFormListeners();
  removeButtonScaleListeners();
  clearEditFormInputs();
  resetUploadedImgScale();
  pristine.reset();
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
  commentInput.addEventListener('keydown', onInputKeyDown);
  hashtagInput.addEventListener('keydown', onInputKeyDown);
};

const showEditForm = () => {
  editFormOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

const onImgInputClick = () => {
  addFiltersContainerListener();
  addButtonScaleListeners();
  showEditForm();
  addEditFormListeners();
};

imgInput.addEventListener('change', onImgInputClick);

export {};
