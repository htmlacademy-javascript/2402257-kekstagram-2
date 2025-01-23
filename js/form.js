const imgInput = document.querySelector('.img-upload__input');
const editFormOverlay = document.querySelector('.img-upload__overlay');
const editForm = document.querySelector('.img-upload__form');
const closeButton = editForm.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const hashtagInput = editForm.querySelector('.text__hashtags');
const body = document.body;

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const checkHashtag = () => {
  const testedHastagValues = [];
  const hashtagValues = hashtagInput.value
    .split(' ')
    .filter((hash) => hash !== '');
  if (hashtagValues.length > 5) {
    return false;
  } else {
    hashtagValues.forEach((element) =>
      testedHastagValues.push(hashtag.test(element))
    );
    if (testedHastagValues.every((value) => value === true)) {
      return true;
    } else {
      return false;
    }
  }
};

const pristine = new Pristine(editForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

pristine.addValidator(hashtagInput, checkHashtag, 'Хэштеги не валидны!');

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('penis');
  } else {
    console.log('no penis');
  }
});

const hideEditForm = () => {
  editFormOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', hideEditForm);
};

const onImgInputClick = () => {
  editFormOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', hideEditForm);
};

imgInput.addEventListener('change', onImgInputClick);

export {};
