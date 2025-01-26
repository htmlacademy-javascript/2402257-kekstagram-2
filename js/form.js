import { isEscapeKey } from './util.js';

const COMMENT_LENGTH_LIMIT = 140;
const MAX_QUANTITY_OF_HASHTAGS = 5;

const imgInput = document.querySelector('.img-upload__input');
const editFormOverlay = document.querySelector('.img-upload__overlay');
const editForm = document.querySelector('.img-upload__form');
const closeButton = editForm.querySelector('.img-upload__cancel');
const hashtagInput = editForm.querySelector('.text__hashtags');
const commentInput = editForm.querySelector('.text__description');
const body = document.body;
const regular = /^#[a-zа-яё0-9]{1,19}$/i;

let errorText = '';

const separateHashtags = (input) =>
  input.value.split(' ').filter((hash) => Boolean(hash));

const checkCommentLimit = () =>
  !(commentInput.value.length > COMMENT_LENGTH_LIMIT);

const checkHashtagRegular = (hashtags) => {
  const hashtagValues = hashtags.filter(
    (value) => regular.test(value) === false
  );
  return hashtagValues.length <= 0;
};

const checkHashtagLength = (hashtags) => {
  const hashtagLength = hashtags.length;

  return hashtagLength <= MAX_QUANTITY_OF_HASHTAGS;
};

const checkDuplicatedHashtag = (hashtags) => {
  const hashtagsToCompare = hashtags;
  return hashtagsToCompare.length === new Set(hashtagsToCompare).size;
};

const validations = [
  checkHashtagLength,
  checkHashtagRegular,
  checkDuplicatedHashtag,
];

const validationsErrorText = [
  'Неверное кол-во Хэштегов! ',
  'Хэштеги невалидны! ',
  'Хэштеги повторяются!',
];
const commentErrorText = 'Длина комментария привышает 140 символов!';

const generateErrorText = () => errorText;

const validateHashtags = () => {
  errorText = '';
  const hashtags = separateHashtags(hashtagInput);
  let currentValidation = '';
  let status = true;
  for (let j = 0; j < validations.length; j++) {
    currentValidation = validations[j];
    if (currentValidation(hashtags) === false) {
      status = false;
      errorText += validationsErrorText[j];
    }
  }
  return status;
};
const pristine = new Pristine(editForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtagInput, validateHashtags, generateErrorText);

pristine.addValidator(commentInput, checkCommentLimit, commentErrorText);

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
  hideEditForm();
  removeEditFormListeners();
  clearEditFormInputs();
  pristine.reset();
  closeButton.removeEventListener('click', destroyEditForm);
};

function onEditFormSubmit(evt) {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    console.log('Форма валидна! Отправляем данные на сервер...');
    editForm.removeEventListener('submit', onEditFormSubmit);
    destroyEditForm();
  } else {
    console.log('Форма невалидна! Исправьте ошибки.');
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
  showEditForm();
  addEditFormListeners();
};

imgInput.addEventListener('change', onImgInputClick);

export {};
