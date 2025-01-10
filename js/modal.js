import { userPhotoInterface, photosData } from './miniature.js';

const modal = document.querySelector('.big-picture');
const bigPicture = modal.querySelector('.big-picture__img img');
const pictures = document.querySelectorAll('.picture');
const likes = modal.querySelector('.likes-count');
const closeButton = modal.querySelector('.big-picture__cancel');

for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', () => {
    modal.classList.remove('hidden');
    bigPicture.src = photosData[i].url;
    likes.textContent = photosData[i].likes;
  });
}

closeButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});
export { modal };
