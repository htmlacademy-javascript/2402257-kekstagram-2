const Filter = {
  CHROME: 'effect-chrome',
  SEPIA: 'effect-sepia',
  MARVIN: 'effect-marvin',
  PHOBOS: 'effect-phobos',
  HEAT: 'effect-heat',
  ORIGINAL: 'effect-none',
};

const filterConfigs = {
  [Filter.CHROME]: {
    config: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    cssRule: 'grayscale',
    measure: '',
  },
  [Filter.SEPIA]: {
    config: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    cssRule: 'sepia',
    measure: '',
  },
  [Filter.MARVIN]: {
    config: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    cssRule: 'invert',
    measure: '%',
  },
  [Filter.PHOBOS]: {
    config: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    cssRule: 'blur',
    measure: 'px',
  },
  [Filter.HEAT]: {
    config: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    cssRule: 'brightness',
    measure: '',
  },
  [Filter.ORIGINAL]: {
    config: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    cssRule: '',
    measure: '',
  },
  default: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
  },
};

const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValueOutput = document.querySelector('.effect-level__value');
const filtersContainer = document.querySelector('.effects__list');
const uploadedImg = document.querySelector('.img-upload__preview img');

noUiSlider.create(slider, filterConfigs.default);

sliderContainer.classList.add('hidden');

const resetFilterValue = () => {
  uploadedImg.style.filter = '';
};

const getSliderValue = () => {
  const sliderValue = Number(slider.noUiSlider.get());
  return sliderValue;
};

const updateSlider = (filter, filterMeasure) => {
  slider.noUiSlider.on('update', () => {
    effectValueOutput.value = getSliderValue();
    uploadedImg.style.filter = `${filter}(${slider.noUiSlider.get()}${filterMeasure})`;
  });
};

const updateFilterSettings = (filtername) => {
  if (filtername === Filter.ORIGINAL) {
    slider.noUiSlider.updateOptions('effect-none');
    resetFilterValue();

    sliderContainer.classList.add('hidden');
  } else {
    slider.noUiSlider.updateOptions(filterConfigs[filtername].config);
    updateSlider(
      filterConfigs[filtername].cssRule,
      filterConfigs[filtername].measure
    );
    sliderContainer.classList.remove('hidden');
  }
};

const onFilterContainerClick = (evt) => {
  if (evt.target.id) {
    updateFilterSettings(evt.target.id);
  }
};

const resetFilter = () => {
  resetFilterValue();
  slider.noUiSlider.updateOptions(filterConfigs.default);
};

const initFilter = () => {
  filtersContainer.addEventListener('click', onFilterContainerClick);
};
const destroyFilter = () => {
  filtersContainer.removeEventListener('click', onFilterContainerClick);
  sliderContainer.classList.add('hidden');
  resetFilterValue();
};

export { initFilter, destroyFilter, resetFilter };
