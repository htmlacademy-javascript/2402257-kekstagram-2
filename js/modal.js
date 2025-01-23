import { isEscapeKey } from './util.js';

const QUANTITY_OF_COMMENTS = 5;

const modal = document.querySelector('.big-picture');
const body = document.body;
const bigPicture = modal.querySelector('.big-picture__img img');
const showedCommentsCount = modal.querySelector('.social__comment-shown-count');
const description = modal.querySelector('.social__caption');
const allCommentsCount = modal.querySelector('.social__comment-total-count');
const commentsBlock = modal.querySelector('.social__comments');
const comment = document.querySelector('#picture_comment').content;
const likes = modal.querySelector('.likes-count');
const closeButton = modal.querySelector('.big-picture__cancel');
const loadButton = modal.querySelector('.social__comments-loader');

let modalState = {};

const setModalState = ({ data, renderedCommentsCount }) => {
  modalState = {
    data,
    renderedCommentsCount,
  };
};

const createCommentElement = ({ avatar, message, name }) => {
  const commentElement = comment.cloneNode(true);
  const commentElementAvatar = commentElement.querySelector('img');
  const commentElementMessage = commentElement.querySelector('p');

  commentElementAvatar.src = avatar;
  commentElementAvatar.alt = name;
  commentElementMessage.textContent = message;

  return commentElement;
};

const toggleLoadMoreButton = (isHidden) => {
  loadButton.classList.toggle('hidden', isHidden);
};

const updateComments = () => {
  const {
    data: { comments },
    renderedCommentsCount,
  } = modalState;
  const fragment = document.createDocumentFragment();

  const lastCommentIndex = Math.min(
    renderedCommentsCount + QUANTITY_OF_COMMENTS,
    comments.length
  );
  for (let i = renderedCommentsCount; i < lastCommentIndex; i++) {
    fragment.appendChild(createCommentElement(comments[i]));
  }

  commentsBlock.appendChild(fragment);

  toggleLoadMoreButton(lastCommentIndex >= comments.length);

  showedCommentsCount.textContent = lastCommentIndex;

  setModalState({ ...modalState, renderedCommentsCount: lastCommentIndex });
};

const closeModal = () => {
  modal.classList.add('hidden');
};

const resetModalContent = () => {
  commentsBlock.innerHTML = '';
};

const destroyModal = () => {
  closeModal();
  resetModalContent();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    destroyModal();
  }
}

const onLoadButtonClick = () => {
  updateComments();
};

const addModalContent = () => {
  const { data: miniatureData } = modalState;
  bigPicture.src = miniatureData.url;
  likes.textContent = miniatureData.likes;
  description.textContent = miniatureData.description;
  allCommentsCount.textContent = miniatureData.comments.length;
};

const openModal = () => {
  modal.classList.remove('hidden');
  body.classList.add('modal-open');
};

const initModal = (data) => {
  setModalState({ data, renderedCommentsCount: 0 });
  openModal();
  addModalContent();
  updateComments();
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseButtonClick = () => {
  destroyModal();
};

loadButton.addEventListener('click', onLoadButtonClick);
closeButton.addEventListener('click', onCloseButtonClick);
export { initModal };
