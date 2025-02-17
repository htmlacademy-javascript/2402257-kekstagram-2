const ESC_KEY = 'Escape';

const isEscapeKey = (evt) => evt.key === ESC_KEY;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, debounce };
