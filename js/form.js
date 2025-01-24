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

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const separateHashtags = (input) =>
  input.value.split(' ').filter((hash) => hash !== '');

const checkCommentLimit = () => {
  if (commentInput.value.length > COMMENT_LENGTH_LIMIT) {
    return false;
  } else {
    return true;
  }
};

const checkHashtagRegular = () => {
  const testedHastagValues = [];
  const hashtagValues = separateHashtags(hashtagInput);

  hashtagValues.forEach((element) =>
    testedHastagValues.push(hashtag.test(element))
  );

  if (testedHastagValues.every((value) => value === true)) {
    return true;
  } else {
    return false;
  }
};

const checkHashtagLength = () => {
  const hashtagLength = separateHashtags(hashtagInput).length;

  if (hashtagLength > MAX_QUANTITY_OF_HASHTAGS) {
    return false;
  } else {
    return true;
  }
};

const checkDuplicatedHashtag = () => {
  const hashtagsToCompare = separateHashtags(hashtagInput);
  let status = true;
  let index = 1;
  let currentHashtag = hashtagsToCompare[0];
  const checkAllHashtag = () => {
    for (let i = index; i < hashtagsToCompare.length; i++) {
      if (currentHashtag === hashtagsToCompare[i]) {
        status = false;
      }
    }
    currentHashtag = hashtagsToCompare[index++];
  };
  checkAllHashtag();
  return status;
};

const pristine = new Pristine(editForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtagInput, checkHashtagRegular, 'Хэштеги не валидны!');

pristine.addValidator(
  hashtagInput,
  checkDuplicatedHashtag,
  'Хэштеги не должны повторяться!'
);

pristine.addValidator(
  hashtagInput,
  checkHashtagLength,
  'Невалидное количество хэштегов!'
);

pristine.addValidator(
  commentInput,
  checkCommentLimit,
  'Длинна комметария не должна превышать 140 символов!'
);

const onInputKeyDown = (evt) => {
  evt.stopPropagation();
};

const hideEditForm = () => {
  editFormOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', hideEditForm);
  commentInput.removeEventListener('keydown', onInputKeyDown);
  hashtagInput.removeEventListener('keydown', onInputKeyDown);
  document.removeEventListener('keydown', onDocumentKeydown);
  editForm.removeEventListener('submit', onEditFormSubmit);
  hashtagInput.value = '';
  commentInput.value = '';
  pristine.reset();
};

function onEditFormSubmit(evt) {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    console.log('Форма валидна! Отправляем данные на сервер...');
    editForm.removeEventListener('submit', onEditFormSubmit);
    hideEditForm();
  } else {
    console.log('Форма невалидна! Исправьте ошибки.');
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    hideEditForm();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onImgInputClick = () => {
  editFormOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', hideEditForm);
  editForm.addEventListener('submit', onEditFormSubmit);
  document.addEventListener('keydown', onDocumentKeydown);
  commentInput.addEventListener('keydown', onInputKeyDown);
  hashtagInput.addEventListener('keydown', onInputKeyDown);
};

imgInput.addEventListener('change', onImgInputClick);

export {};
