import { photosData } from './miniature.js';
import { isEscapeKey } from './util.js';

const START_CHEKER = 0;
const NEXT_FIVE_COMMENTS = 5;
const FIVE_COMMENTS = 5;

const modal = document.querySelector('.big-picture');
const body = document.body;
const picturesContainer = document.querySelector('.pictures');
const bigPicture = modal.querySelector('.big-picture__img img');
const showedCommentsCount = modal.querySelector('.social__comment-shown-count');
const description = modal.querySelector('.social__caption');
const allCommentsCount = modal.querySelector('.social__comment-total-count');
const commentsBlock = modal.querySelector('.social__comments');
const comment = document.querySelector('#picture_comment').content;
const likes = modal.querySelector('.likes-count');
const closeButton = modal.querySelector('.big-picture__cancel');
const loadButton = modal.querySelector('.social__comments-loader');

let bigPhotoComments = [];

const createQuantityOfComments = (data) => {
  data
    .splice(START_CHEKER, NEXT_FIVE_COMMENTS)
    .forEach(({ avatar, message, name }) => {
      //точно ли он тут нужен?
      const commentElement = comment.cloneNode(true);
      const commentElementAvatar = commentElement.querySelector('img');
      const commentElementMessage = commentElement.querySelector('p');

      commentElementAvatar.src = avatar;
      commentElementAvatar.alt = name;
      commentElementMessage.textContent = message;
      commentsBlock.appendChild(commentElement);
    });
  const quantityOfComments = commentsBlock.children.length;
  showedCommentsCount.textContent = quantityOfComments;
};

const hideLoadButtonIfEquals = (comments) => {
  if (commentsBlock.children.length === comments.length) {
    loadButton.classList.add('hidden');
  }
};

const loadComments = (photoComment) => {
  if (photoComment.length < FIVE_COMMENTS) {
    loadButton.classList.add('hidden');
  }
  createQuantityOfComments(photoComment);
};

const onLoaderButtonClick = () => {
  loadComments(bigPhotoComments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    modal.classList.add('hidden');
    commentsBlock.innerHTML = '';
    document.removeEventListener('keydown', onDocumentKeydown);
    bigPhotoComments = [];
    loadButton.removeEventListener('click', onLoaderButtonClick);
  }
};

const addModalContent = (miniatureData) => {
  bigPicture.src = miniatureData.url;
  likes.textContent = miniatureData.likes;
  description.textContent = miniatureData.description;
  allCommentsCount.textContent = miniatureData.comments.length;
};

const onPicturesContainerClick = (evt) => {
  if (evt.target.nodeName === 'IMG') {
    const miniatureData = photosData.find(
      (photoData) => photoData.id === +evt.target.dataset.id
    );
    bigPhotoComments.push(...miniatureData.comments);
    loadComments(bigPhotoComments);
    modal.classList.remove('hidden');
    body.classList.add('.modal-open');
    addModalContent(miniatureData);
    if (commentsBlock.children.length !== miniatureData.comments.length) {
      loadButton.classList.remove('hidden');
    }
    hideLoadButtonIfEquals(miniatureData.comments);
  }

  document.addEventListener('keydown', onDocumentKeydown);
  loadButton.addEventListener('click', onLoaderButtonClick);
};

const onCloseButtonClick = () => {
  modal.classList.add('hidden');
  commentsBlock.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPhotoComments = [];
  loadButton.removeEventListener('click', onLoaderButtonClick);
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

closeButton.addEventListener('click', onCloseButtonClick);
export { onPicturesContainerClick };
