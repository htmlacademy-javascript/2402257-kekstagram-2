import { photosData } from './miniature.js';
import { isEscapeKey } from './util.js';

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
const loadMoreButton = modal.querySelector('.social__comments-loader');
let unLoadedComments = [];

const onLoaderButtonClick = () => {
  for (let i = unLoadedComments.length - 1; i >= 0; i--) {
    if (i < 5) {
      const commentElement = comment.cloneNode(true);
      const commentElementAvatar = commentElement.querySelector('img');
      const commentElementMessage = commentElement.querySelector('p');

      commentElementAvatar.src = unLoadedComments[i].avatar;
      commentElementAvatar.alt = unLoadedComments[i].name;
      commentElementMessage.textContent = unLoadedComments[i].message;

      commentsBlock.appendChild(commentElement);

      unLoadedComments.splice(i, 1);
    }
  }
  if (unLoadedComments.length === 0) {
    loadMoreButton.classList.add('hidden');
  }
  showedCommentsCount.textContent = commentsBlock.children.length;
};

const loadComments = (miniatureData, commentData) => {
  if (miniatureData.comments.indexOf(commentData) < 5) {
    const commentElement = comment.cloneNode(true);
    const commentElementAvatar = commentElement.querySelector('img');
    const commentElementMessage = commentElement.querySelector('p');

    commentElementAvatar.src = commentData.avatar;
    commentElementAvatar.alt = commentData.name;
    commentElementMessage.textContent = commentData.message;
    commentsBlock.appendChild(commentElement);

    const quantityOfComments = commentsBlock.children.length;
    showedCommentsCount.textContent = quantityOfComments;
  }
  if (miniatureData.comments.indexOf(commentData) >= 5) {
    unLoadedComments.push(commentData);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    modal.classList.add('hidden');
    commentsBlock.innerHTML = '';
    document.removeEventListener('keydown', onDocumentKeydown);
    loadMoreButton.removeEventListener('click', onLoaderButtonClick);
    unLoadedComments = [];
  }
};

const addModalContent = (miniatureData) => {
  bigPicture.src = miniatureData.url;
  likes.textContent = miniatureData.likes;
  description.textContent = miniatureData.description;
};

const addModalComment = (miniatureData) => {
  miniatureData.comments.forEach((commentData) => {
    loadComments(miniatureData, commentData);
  });
};

const onPicturesContainerClick = (evt) => {
  const miniatureData = photosData.find(
    (photoData) => photoData.id === +evt.target.dataset.id
  );
  const miniatureComments = photosData.find(
    (commentData) => commentData.comments
  );

  if (evt.target.nodeName === 'IMG') {
    modal.classList.remove('hidden');
    body.classList.add('.modal-open');
    addModalContent(miniatureData);
    addModalComment(miniatureData, miniatureComments);
  }
  document.addEventListener('keydown', onDocumentKeydown);
  loadMoreButton.addEventListener('click', onLoaderButtonClick);
  loadMoreButton.classList.remove('hidden');
  allCommentsCount.textContent = miniatureData.comments.length;
};

const onCloseButtonClick = () => {
  modal.classList.add('hidden');
  commentsBlock.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  loadMoreButton.removeEventListener('click', onLoaderButtonClick);
  unLoadedComments = [];
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

closeButton.addEventListener('click', onCloseButtonClick);

export { onPicturesContainerClick };
