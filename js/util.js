const SHOW_ERROR_TIME = 5000;

const ErrorTemplateId = {
  DATA: '#data-error',
};

const ErrorNode = {
  DATA: '.data-error',
};
const getRandomIntInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createId = (initialId = 0) => {
  let currentId = initialId - 1;

  return () => ++currentId;
};
const isEscapeKey = (evt) => evt.key === 'Escape';

const showErrorMessage = () => {
  const errorBlock = document.querySelector(ErrorTemplateId.DATA).content;
  const errorElement = errorBlock.cloneNode(true);
  const body = document.body;
  const errorNode = errorElement.querySelector(ErrorNode.DATA);
  body.appendChild(errorElement);

  setTimeout(() => {
    errorNode.remove();
  }, SHOW_ERROR_TIME);
};

export { getRandomIntInclusive, createId, isEscapeKey, showErrorMessage };
