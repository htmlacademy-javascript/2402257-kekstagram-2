const ScaleConfig = {
  maxScale: 100,
  scaleStep: 25,
  biggerButtonLimit: 75,
  smallerButtonLimit: 50,
};

const ButtonAction = {
  increase: 'increase',
  decrease: 'decrease',
};

const buttonBigger = document.querySelector('.scale__control--bigger');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const scaleValueOutput = document.querySelector('.scale__control--value');
const uploadedImg = document.querySelector('.img-upload__preview img');

const changeScale = (action) => {
  let value = parseFloat(scaleValueOutput.value);

  if (
    action === ButtonAction.increase &&
    value <= ScaleConfig.biggerButtonLimit
  ) {
    value += ScaleConfig.scaleStep;
  }
  if (
    action === ButtonAction.decrease &&
    value >= ScaleConfig.smallerButtonLimit
  ) {
    value -= ScaleConfig.scaleStep;
  }

  if (value === ScaleConfig.maxScale) {
    //зачем что-то делать если мы достигли границы? (не знаю как изменить это)
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
