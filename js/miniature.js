import { createPhotoPost } from './photopost.js';

const QUANTITY_OF_PHOTOS = 25;

const userPhotoInterface = document.querySelector('.pictures');
const sample = document.querySelector('#picture').content;
const photosData = createPhotoPost(QUANTITY_OF_PHOTOS);
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

const createdPhotosElements = createMiniatures(photosData);

userPhotoInterface.append(createdPhotosElements);
export { createMiniatures, photosData, userPhotoInterface };
