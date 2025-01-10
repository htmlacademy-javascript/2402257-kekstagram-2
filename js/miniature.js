import { createPhotoPost } from './photopost.js';

const QUANTITY_OF_PHOTOS = 19;

const userPhotoInterface = document.querySelector('.pictures');
const sample = document.querySelector('#picture').content;
const photosData = createPhotoPost(QUANTITY_OF_PHOTOS);
const generatedPictures = document.createDocumentFragment();

const createCloneElement = ({ comments, likes, url, description }) => {
  const clonedElement = sample.cloneNode(true);
  const clonedElementImg = clonedElement.querySelector('.picture__img');
  const clonedElementLikes = clonedElement.querySelector('.picture__likes');
  const clonedElementComments =
    clonedElement.querySelector('.picture__comments');

  clonedElementComments.textContent = comments.length;
  clonedElementLikes.textContent = likes;
  clonedElementImg.src = url;
  clonedElementImg.alt = description;
  generatedPictures.append(clonedElement);
};

const createMiniature = (photos) => {
  photos.forEach((photo) => {
    createCloneElement(photo);
  });
  return generatedPictures;
};

const createdPhotosElements = createMiniature(photosData);

userPhotoInterface.append(createdPhotosElements);
export { createMiniature, photosData, userPhotoInterface };
