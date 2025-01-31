const FILTER_CONFIGS = {
  'effect-chrome': [
    {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    'grayscale',
  ],
  'effect-sepia': [
    {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    'sepia',
  ],
  'effect-marvin': [
    {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    'invert',
  ],
  'effect-phobos': [
    {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    'blur',
  ],
  'effect-heat': [
    {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    'brightness',
  ],
  'effect-none': [
    {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    '',
  ],
};

const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValueOutput = document.querySelector('.effect-level__value');
const filtersContainer = document.querySelector('.effects__list');
const uploadedImg = document.querySelector('.img-upload__preview img');

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

const updateFilterSettings = (filtername) => {
  if (filtername === 'effect-none') {
    slider.noUiSlider.updateOptions('effect-none');
    uploadedImg.style.filter = '';

    sliderContainer.classList.add('hidden');
  } else {
    slider.noUiSlider.updateOptions(FILTER_CONFIGS[filtername][0]);
    updateSlider(FILTER_CONFIGS[filtername][1]);
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
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const initFilter = () => {
  filtersContainer.addEventListener('click', onFilterContainerClick);
};
const destroyFilter = () => {
  filtersContainer.removeEventListener('click', onFilterContainerClick);
};

export { initFilter, destroyFilter, resetFilter };
