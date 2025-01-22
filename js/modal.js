import { photosData } from './miniature.js';
import { isEscapeKey } from './util.js';

const QUANTITY_OF_COMMENTS = 5;

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

let renderedCommentsCount = 0;

const renderComment = ({ avatar, message, name }) => {
  const commentElement = comment.cloneNode(true);
  const commentElementAvatar = commentElement.querySelector('img');
  const commentElementMessage = commentElement.querySelector('p');

  commentElementAvatar.src = avatar;
  commentElementAvatar.alt = name;
  commentElementMessage.textContent = message;
  commentsBlock.appendChild(commentElement);
};

// const createQuantityOfComments = (data) => {

// };

// const hideLoadButtonIfEquals = (comments) => {
//   if (commentsBlock.children.length === comments.length) {
//     loadButton.classList.add('hidden');
//   }
// };

const loadComments = (comments) => {
  comments.map(renderComment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    modal.classList.add('hidden');
    commentsBlock.innerHTML = '';
    document.removeEventListener('keydown', onDocumentKeydown);
    // bigPhotoComments = [];
    // loadButton.removeEventListener('click', onLoadButtonClick);
  }
};

const addModalContent = (miniatureData) => {
  bigPicture.src = miniatureData.url;
  likes.textContent = miniatureData.likes;
  description.textContent = miniatureData.description;
  allCommentsCount.textContent = miniatureData.comments.length;
};

const hideLoadMoreCommentsButton = () => loadButton.classList.remove('hidden');

const openModal = () => {
  modal.classList.remove('hidden');
  body.classList.add('.modal-open');
};

const getCommentsToRender = (comments, index) =>
  comments.slice(index, Math.min(QUANTITY_OF_COMMENTS, comments.length));

const setRenderCommitsCounter = (value) => {
  renderedCommentsCount = value;
};

const initModal = (miniatureData) => {
  const commentToRender = getCommentsToRender(miniatureData.comments, 0);

  setRenderCommitsCounter(renderedCommentsCount + commentToRender.length);
  loadComments(commentToRender);

  openModal();

  addModalContent(miniatureData);

  if (renderedCommentsCount >= miniatureData.comments.length) {
    hideLoadMoreCommentsButton();
  }

  const onLoadButtonClick = () => {
    const comments = getCommentsToRender(
      miniatureData.comments,
      renderedCommentsCount
    );
    loadComments(comments);

    setRenderCommitsCounter(comments.length);
  };

  loadButton.addEventListener('click', onLoadButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  modal.classList.add('hidden');
  commentsBlock.innerHTML = '';
};

const onCloseButtonClick = () => {
  closeModal();
  document.removeEventListener('keydown', onDocumentKeydown);
  setRenderCommitsCounter(0);
  // loadButton.removeEventListener('click', onLoadButtonClick);
};

const onPicturesContainerClick = (evt) => {
  if (evt.target.nodeName === 'IMG') {
    const miniatureData = photosData.find(
      (photoData) => photoData.id === +evt.target.dataset.id
    );
    initModal(miniatureData);
  }
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

closeButton.addEventListener('click', onCloseButtonClick);
export { onPicturesContainerClick };
