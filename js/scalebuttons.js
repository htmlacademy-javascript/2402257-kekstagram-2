const MAX_SCALE = 100;
const SCALE_STEP = 25;
const BIGGER_BUTTON_LIMIT = 75;
const SMALLER_BUTTON_LIMIT = 50;

const buttonBigger = document.querySelector('.scale__control--bigger');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const scaleValueOutput = document.querySelector('.scale__control--value');
const uploadedImg = document.querySelector('.img-upload__preview img');
const procent = '%';

const onButttonBiggerClick = () => {
  let value = Number(scaleValueOutput.value.slice(0, -1));

  if (value <= BIGGER_BUTTON_LIMIT) {
    value += SCALE_STEP;
    if (value === MAX_SCALE) {
      uploadedImg.style.transform = 'scale(1)';
    } else {
      uploadedImg.style.transform = `scale(0.${value})`;
    }

    const resultValue = value.toString() + procent;
    scaleValueOutput.value = resultValue;
  }
};

const onButttonSmallerClick = () => {
  let value = Number(scaleValueOutput.value.slice(0, -1));

  if (value >= SMALLER_BUTTON_LIMIT) {
    value -= SCALE_STEP;
    uploadedImg.style.transform = `scale(0.${value})`;
    const resultValue = value.toString() + procent;
    scaleValueOutput.value = resultValue;
  }
};

const resetUploadedImgScale = () => {
  uploadedImg.style.transform = 'scale(1)';
};
const addButtonScaleListeners = () => {
  buttonBigger.addEventListener('click', onButttonBiggerClick);

  buttonSmaller.addEventListener('click', onButttonSmallerClick);
};

const removeButtonScaleListeners = () => {
  buttonBigger.removeEventListener('click', onButttonBiggerClick);

  buttonSmaller.removeEventListener('click', onButttonSmallerClick);
};

export {
  addButtonScaleListeners,
  removeButtonScaleListeners,
  resetUploadedImgScale,
};
