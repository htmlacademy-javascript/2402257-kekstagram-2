const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileLoader = document.querySelector('#upload-file');
const previewPicture = document.querySelector('.img-upload__preview img');
const previewFilters = document.querySelectorAll('.effects__preview');

fileLoader.addEventListener('change', () => {
  const file = fileLoader.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    const imageUrl = URL.createObjectURL(file);
    previewPicture.src = imageUrl;

    previewFilters.forEach((filter) => {
      filter.style.backgroundImage = `url("${imageUrl}")`;
    });
  }
});

export {};
