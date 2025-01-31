const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValueOutput = document.querySelector('.effect-level__value');
const filtersContainer = document.querySelector('.effects__list');
const uploadedImg = document.querySelector('.img-upload__preview img');
//эффект левел неправильно отправляется
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower',
});

sliderContainer.classList.add('hidden');

const updateSlider = (filter) => {
  slider.noUiSlider.on('update', () => {
    effectValueOutput.value = slider.noUiSlider.get();
    if (filter === 'blur') {
      uploadedImg.style.filter = `${filter}(${slider.noUiSlider.get()}px)`;
    }
    if (filter === 'invert') {
      uploadedImg.style.filter = `${filter}(${slider.noUiSlider.get()}%)`;
    } else {
      uploadedImg.style.filter = `${filter}(${slider.noUiSlider.get()})`;
    }
  });
};
const onFilterContainerClick = (evt) => {
  if (evt.target.id === 'effect-chrome') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    updateSlider('grayscale');
    sliderContainer.classList.remove('hidden');
  }
  if (evt.target.id === 'effect-sepia') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    updateSlider('sepia');
    sliderContainer.classList.remove('hidden');
  }
  if (evt.target.id === 'effect-marvin') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    updateSlider('invert');
    sliderContainer.classList.remove('hidden');
  }
  if (evt.target.id === 'effect-phobos') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    updateSlider('blur');
    sliderContainer.classList.remove('hidden');
  }
  if (evt.target.id === 'effect-heat') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    updateSlider('brightness');
    sliderContainer.classList.remove('hidden');
  }
  if (evt.target.id === 'effect-none') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      connect: 'lower',
    });
    uploadedImg.style.filter = '';

    sliderContainer.classList.add('hidden');
  }
};

const resetFilter = () => {
  uploadedImg.style.filter = '';
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const addFiltersContainerListener = () => {
  filtersContainer.addEventListener('click', onFilterContainerClick);
};
const removeFiltersContainerListener = () => {
  filtersContainer.removeEventListener('click', onFilterContainerClick);
};

export {
  addFiltersContainerListener,
  removeFiltersContainerListener,
  resetFilter,
};
