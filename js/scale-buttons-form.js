const SCALE_CONFIG = {
  MAX_SCALE: 100,
  SCALE_STEP: 25,
  BIGGER_BUTTON_LIMIT: 75,
  SMALLER_BUTTON_LIMIT: 50,
};

const buttonBigger = document.querySelector('.scale__control--bigger');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const scaleValueOutput = document.querySelector('.scale__control--value');
const uploadedImg = document.querySelector('.img-upload__preview img');

const changeScale = (action) => {
  let value = Number(scaleValueOutput.value.replace(/\D/g, ''));

  if (action === 'increase' && value <= SCALE_CONFIG.BIGGER_BUTTON_LIMIT) {
    value += SCALE_CONFIG.SCALE_STEP;
  } else if (
    action === 'decrease' &&
    value >= SCALE_CONFIG.SMALLER_BUTTON_LIMIT
  ) {
    value -= SCALE_CONFIG.SCALE_STEP;
  }

  if (value === SCALE_CONFIG.MAX_SCALE) {
    uploadedImg.style.transform = 'scale(1)';
  } else {
    uploadedImg.style.transform = `scale(0.${value})`;
  }

  const resultValue = `${value}%`;
  scaleValueOutput.value = resultValue;
};

const onButttonBiggerClick = () => {
  changeScale('increase');
};

const onButtonSmallerClick = () => {
  changeScale('decrease');
};

const resetUploadedImgScale = () => {
  uploadedImg.style.transform = 'scale(1)';
};
const initScaleButtons = () => {
  buttonBigger.addEventListener('click', onButttonBiggerClick);

  buttonSmaller.addEventListener('click', onButtonSmallerClick);
};

const destroyScaleButtons = () => {
  buttonBigger.removeEventListener('click', onButttonBiggerClick);

  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
};

export { initScaleButtons, destroyScaleButtons, resetUploadedImgScale };
