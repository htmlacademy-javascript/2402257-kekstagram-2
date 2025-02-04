const Filters = {
  CHROME_FILTER: 'effect-chrome',
  SEPIA_FILTER: 'effect-sepia',
  MARVIN_FILTER: 'effect-marvin',
  PHOBOS_FILTER: 'effect-phobos',
  HEAT_FILTER: 'effect-heat',
  ORIGINAL_FILTER: 'effect-none',
};

const filterConfigs = {
  [Filters.CHROME_FILTER]: {
    config: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    cssRule: 'grayscale',
  },
  [Filters.SEPIA_FILTER]: {
    config: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    cssRule: 'sepia',
  },
  [Filters.MARVIN_FILTER]: {
    config: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    cssRule: 'invert',
  },
  [Filters.PHOBOS_FILTER]: {
    config: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    cssRule: 'blur',
  },
  [Filters.HEAT_FILTER]: {
    config: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    cssRule: 'brightness',
  },
  [Filters.ORIGINAL_FILTER]: {
    config: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    cssRule: '',
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

const updateFilterSettings = (filtername) => {
  if (filtername === Filters.ORIGINAL_FILTER) {
    slider.noUiSlider.updateOptions('effect-none');
    uploadedImg.style.filter = '';

    sliderContainer.classList.add('hidden');
  } else {
    slider.noUiSlider.updateOptions(filterConfigs[filtername].config);
    updateSlider(filterConfigs[filtername].cssRule);
    sliderContainer.classList.remove('hidden');
  }
};

const onFilterContainerClick = (evt) => {
  if (evt.target.id) {
    updateFilterSettings(evt.target.id);
  }
};

const resetFilter = () => {
  uploadedImg.style.filter = '';
  slider.noUiSlider.updateOptions(filterConfigs.default);
};

const initFilter = () => {
  filtersContainer.addEventListener('click', onFilterContainerClick);
};
const destroyFilter = () => {
  filtersContainer.removeEventListener('click', onFilterContainerClick);
  sliderContainer.classList.add('hidden');
  uploadedImg.style.filter = '';
};

export { initFilter, destroyFilter, resetFilter };
