import { initModal } from './modal.js';

let currentData = '';

const userPhotoInterface = document.querySelector('.pictures');
const sample = document.querySelector('#picture').content;
const generatedPictures = document.createDocumentFragment();

const createMiniature = ({ comments, likes, url, description, id }) => {
  const clonedElement = sample.cloneNode(true);
  const clonedElementImg = clonedElement.querySelector('.picture__img');
  const clonedElementLink = clonedElement.querySelector('.picture');
  const clonedElementLikes = clonedElement.querySelector('.picture__likes');
  const clonedElementComments =
    clonedElement.querySelector('.picture__comments');

  clonedElementComments.textContent = comments.length;
  clonedElementLikes.textContent = likes;
  clonedElementImg.src = url;
  clonedElementImg.alt = description;
  clonedElementLink.dataset.id = id;
  generatedPictures.append(clonedElement);
};

const createMiniatures = (photos) => {
  photos.forEach((photo) => {
    createMiniature(photo);
  });
  return generatedPictures;
};

const onUserPhotoInterfaceClick = (evt) => {
  if (
    evt.target.classList.contains('picture') ||
    evt.target.closest('.picture')
  ) {
    evt.preventDefault();

    const miniatureData = currentData.find(
      (photoData) => photoData.id === +evt.target.closest('.picture').dataset.id
    );
    initModal(miniatureData);
  }
};

userPhotoInterface.addEventListener('click', onUserPhotoInterfaceClick);

const generateUserInterface = (data) => {
  data().then((photosData) => {
    if (!(photosData === undefined)) {
      // сделал чтоб не вылетала ошибка, почему-то, если не приходят данные тут undefind
      // вот тут не понял что надо сделать в итоге, как избежать этой проверки?
      const createdPhotosElements = createMiniatures(photosData);
      userPhotoInterface.append(createdPhotosElements);
      currentData = photosData;
    }
  });
};

export { generateUserInterface };
