import { createPhotoPost } from './photopost.js';

const userPhotoInterface = document.querySelector('.pictures');
const sample = document.querySelector('#picture').content;
const photosData = createPhotoPost();
const generatedPictures = document.createDocumentFragment();
// const commentsBlock = document.querySelector('.social__comments');

const createMiniature = ({ comments, likes, url, description, id }) => {
  const clonedElement = sample.cloneNode(true);
  // может так очистить два ненужных комма – commentsBlock.innerHTML = '' ???;
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

export { createMiniatures, photosData, userPhotoInterface };
