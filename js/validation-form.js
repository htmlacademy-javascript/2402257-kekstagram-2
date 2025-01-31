const COMMENT_LENGTH_LIMIT = 140;
const MAX_QUANTITY_OF_HASHTAGS = 5;

const ValidationsErrorText = {
  INVALID_QUANTITY_OF_HASHTAGS: 'Неверное кол-во Хэштегов! ',
  INVALID_REGULAR_HASHTAGS: 'Хэштеги невалидны! ',
  INVALID_DUPLICATED_HASHTAGS: 'Хэштеги повторяются!',
  INVALID_LENGTH_OF_COMMENTS: 'Длина комментария привышает 140 символов!',
};
let pristine = '';
const editForm = document.querySelector('.img-upload__form');

const hashtagInput = editForm.querySelector('.text__hashtags');
const commentInput = editForm.querySelector('.text__description');

const regular = /^#[a-zа-яё0-9]{1,19}$/i;

const getHashtags = (input) =>
  input.value.split(' ').filter((hash) => Boolean(hash));

const checkCommentLimit = () =>
  !(commentInput.value.length > COMMENT_LENGTH_LIMIT);

const checkHashtagRegular = (hashtag) => regular.test(hashtag);

const getRegularValidationMessage = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    if (!checkHashtagRegular(hashtags[i])) {
      return ValidationsErrorText.INVALID_REGULAR_HASHTAGS;
    }
  }
};

const getLengthValidationMessage = (hashtags) => {
  if (!(hashtags.length <= MAX_QUANTITY_OF_HASHTAGS)) {
    return ValidationsErrorText.INVALID_QUANTITY_OF_HASHTAGS;
  }
};
const getDuplicateValidationMessage = (hashtags) => {
  if (!(hashtags.length === new Set(hashtags).size)) {
    return ValidationsErrorText.INVALID_DUPLICATED_HASHTAGS;
  }
};
const validations = [
  getLengthValidationMessage,
  getRegularValidationMessage,
  getDuplicateValidationMessage,
];

const getErrorMessage = () => {
  const hashtags = getHashtags(hashtagInput);

  return validations.reduce((acc, validator) => {
    const message = validator(hashtags);
    return message ? [...acc, message].join('') : acc;
  }, []);
};
const validateHashtags = () => {
  const errorMessage = getErrorMessage();
  return errorMessage.length === 0;
};

const addValidators = () => {
  pristine = new Pristine(editForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(hashtagInput, validateHashtags, getErrorMessage);

  pristine.addValidator(
    commentInput,
    checkCommentLimit,
    ValidationsErrorText.INVALID_LENGTH_OF_COMMENTS
  );
};

const resetValidators = () => {
  pristine.reset();
};

export { addValidators, resetValidators, pristine };
