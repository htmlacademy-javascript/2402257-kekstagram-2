import { createPhotoPost } from './photopost.js';
import { initModal } from './modal.js';
const userPhotoInterface = document.querySelector('.pictures');
const sample = document.querySelector('#picture').content;
const photosData = createPhotoPost();
const generatedPictures = document.createDocumentFragment();

const createMiniature = ({ comments, likes, url, description, id }) => {
  const clonedElement = sample.cloneNode(true);
  const clonedElementImg = clonedElement.querySelector('.picture__img');
  const clonedElementLikes = clonedElement.querySelector('.picture__likes');
  const clonedElementComments =
    clonedElement.querySelector('.picture__comments');

  clonedElementComments.textContent = comments.length;
  clonedElementLikes.textContent = likes;
  clonedElementImg.src = url;
  clonedElementImg.alt = description;
  clonedElementImg.dataset.id = id;
  generatedPictures.append(clonedElement);
};

const createMiniatures = (photos) => {
  photos.forEach((photo) => {
    createMiniature(photo);
  });
  return generatedPictures;
};

const onUserPhotoInterfaceClick = (evt) => {
  if (evt.target.nodeName === 'IMG') {
    const miniatureData = photosData.find(
      (photoData) => photoData.id === +evt.target.dataset.id
    );
    initModal(miniatureData);
  }
};

userPhotoInterface.addEventListener('click', onUserPhotoInterfaceClick);

export { createMiniatures, photosData, userPhotoInterface };
