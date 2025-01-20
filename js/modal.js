import { photosData } from './miniature.js';
import { isEscapeKey } from './util.js';

const START_CHEKER = 0;
const NEXT_FIVE_COMMENTS = 5;

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

const hideLoadButton = (comments) => {
  if (commentsBlock.children.length === comments.length) {
    loadButton.classList.add('hidden');
  }
};

const loadFiveComments = (photoComment) => {
  if (photoComment.length < 5) {
    loadButton.classList.add('hidden');
  }
  const fiveComments = photoComment.splice(START_CHEKER, NEXT_FIVE_COMMENTS);

  fiveComments.forEach(({ avatar, message, name }) => {
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

const onLoaderButtonClick = () => {
  loadFiveComments(bigPhotoComments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    modal.classList.add('hidden');
    commentsBlock.innerHTML = '';
    document.removeEventListener('keydown', onDocumentKeydown);
    bigPhotoComments = [];
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
    loadFiveComments(bigPhotoComments);
    modal.classList.remove('hidden');
    body.classList.add('.modal-open');
    addModalContent(miniatureData);
    if (commentsBlock.children.length !== miniatureData.comments.length) {
      loadButton.classList.remove('hidden');
    }
    hideLoadButton(miniatureData.comments);
  }

  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseButtonClick = () => {
  modal.classList.add('hidden');
  commentsBlock.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPhotoComments = [];
};

loadButton.addEventListener('click', onLoaderButtonClick);
picturesContainer.addEventListener('click', onPicturesContainerClick);

closeButton.addEventListener('click', onCloseButtonClick);
export { onPicturesContainerClick };
