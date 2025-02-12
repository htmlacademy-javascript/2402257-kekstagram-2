const ScaleConfig = {
  maxScale: 100,
  minScale: 25,
  scaleStep: 25,
};

const ButtonAction = {
  increase: 1,
  decrease: -1,
};

const buttonBigger = document.querySelector('.scale__control--bigger');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const scaleValueOutput = document.querySelector('.scale__control--value');
const uploadedImg = document.querySelector('.img-upload__preview img');

const getCurrentScaleValue = () => parseFloat(scaleValueOutput.value);

const setImageScale = (value) => {
  uploadedImg.style.transform = `scale(${value / 100})`;
};

const updateOutputValue = (value) => {
  scaleValueOutput.value = `${value}%`;
};

const changeScale = (action) => {
  let value = getCurrentScaleValue();
  value += action * ScaleConfig.scaleStep;

  if (value > ScaleConfig.maxScale || value < ScaleConfig.minScale) {
    return;
  }

  setImageScale(value);
  updateOutputValue(value);
};
const onButttonBiggerClick = () => {
  changeScale(ButtonAction.increase);
};

const onButtonSmallerClick = () => {
  changeScale(ButtonAction.decrease);
};

const resetUploadedImgScale = () => {
  setImageScale(ScaleConfig.maxScale);
};
const initScaleButtons = () => {
  scaleValueOutput.value = '100%';
  buttonBigger.addEventListener('click', onButttonBiggerClick);

  buttonSmaller.addEventListener('click', onButtonSmallerClick);
};

const destroyScaleButtons = () => {
  buttonBigger.removeEventListener('click', onButttonBiggerClick);

  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
};

export { initScaleButtons, destroyScaleButtons, resetUploadedImgScale };
