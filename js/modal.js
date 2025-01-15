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
const commentsCountContainer = document.querySelector('.social__comment-count');
const comment = document.querySelector('.social__comment');
const likes = modal.querySelector('.likes-count');
const closeButton = modal.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    modal.classList.add('hidden');
    commentsBlock.innerHTML = '';
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const addModalContent = (miniatureData) => {
  bigPicture.src = miniatureData.url;
  likes.textContent = miniatureData.likes;
  description.textContent = miniatureData.description;
  allCommentsCount.textContent = miniatureData.comments.length;
};

const addModalComment = (miniatureData) => {
  miniatureData.comments.forEach(({ avatar, message, name }) => {
    const commentElement = comment.cloneNode(true);
    const commentElementAvatar = commentElement.querySelector('img');
    const commentElementMessage = commentElement.querySelector('p');

    commentElementAvatar.src = avatar;
    commentElementAvatar.alt = name;
    commentElementMessage.textContent = message;
    commentsBlock.appendChild(commentElement);

    const quantityOfComments = commentsBlock.children.length;
    showedCommentsCount.textContent = quantityOfComments;
  });
};

const onPicturesContainerClick = (evt) => {
  const miniatureData = photosData.find(
    (photoData) => photoData.id === +evt.target.dataset.id
  );

  if (evt.target.nodeName === 'IMG') {
    modal.classList.remove('hidden');
    commentsCountContainer.classList.add('hidden');
    body.classList.add('.modal-open');
    addModalContent(miniatureData);
    addModalComment(miniatureData);
  }
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseButtonClick = () => {
  modal.classList.add('hidden');
  commentsBlock.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

picturesContainer.addEventListener('click', onPicturesContainerClick);

closeButton.addEventListener('click', onCloseButtonClick);
export { onPicturesContainerClick };
