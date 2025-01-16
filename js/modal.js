import { photosData } from './miniature.js';
import { isEscapeKey } from './util.js';

let COMMENTS_QUANTITY_CHECKER = 5;
let SHOWED_CHILDRENS = 0;
const NEXT_QUANTITY_OF_COMMENTS = 5;

const modal = document.querySelector('.big-picture');
const body = document.body;
const picturesContainer = document.querySelector('.pictures');
const bigPicture = modal.querySelector('.big-picture__img img');
const showedCommentsCount = modal.querySelector('.social__comment-shown-count');
const bigPictureDescription = modal.querySelector('.social__caption');
const allCommentsCount = modal.querySelector('.social__comment-total-count');
const commentsBlock = modal.querySelector('.social__comments');
const comment = document.querySelector('.social__comment');
const likesCount = modal.querySelector('.likes-count');
const closeButton = modal.querySelector('.big-picture__cancel');
const commentsLoader = modal.querySelector('.comments-loader');

commentsLoader.classList.remove('hidden');

const checkIfCountersEquals = () => {
  commentsLoader.classList.remove('hidden');
  if (showedCommentsCount.textContent === allCommentsCount.textContent) {
    commentsLoader.classList.add('hidden');
  }
};

const editShownCommentsCount = () => {
  const childrens = Array.from(commentsBlock.children);
  const showedChildrens = childrens.map((child) => child.classList.value);

  for (let i = 0; i < commentsBlock.children.length; i++) {
    if (showedChildrens[i] === 'social__comment') {
      SHOWED_CHILDRENS++;
    }
  }
  showedCommentsCount.textContent = SHOWED_CHILDRENS;
  return SHOWED_CHILDRENS;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    modal.classList.add('hidden');
    commentsBlock.innerHTML = '';
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const addModalContent = ({ url, likes, description, comments }) => {
  bigPicture.src = url;
  likesCount.textContent = likes;
  bigPictureDescription.textContent = description;
  allCommentsCount.textContent = comments.length;
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

    for (let i = 0; i < commentsBlock.children.length; i++) {
      if (i > 4) {
        commentsBlock.children[i].classList.add('hidden');
      }
    }
  });
};

const onPicturesContainerClick = (evt) => {
  const miniatureData = photosData.find(
    (photoData) => photoData.id === +evt.target.dataset.id
  );
  if (evt.target.classList.contains('picture__img')) {
    modal.classList.remove('hidden');
    body.classList.add('.modal-open');
    addModalContent(miniatureData);
    addModalComment(miniatureData);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  editShownCommentsCount();
  checkIfCountersEquals();
};

const onCommentsLoaderButtonClick = () => {
  for (
    let i = COMMENTS_QUANTITY_CHECKER;
    i < commentsBlock.children.length;
    i++
  ) {
    if (i < COMMENTS_QUANTITY_CHECKER + NEXT_QUANTITY_OF_COMMENTS) {
      commentsBlock.children[i].classList.remove('hidden');
    }
  }
  SHOWED_CHILDRENS = 0;
  editShownCommentsCount();
  checkIfCountersEquals();
  COMMENTS_QUANTITY_CHECKER =
    COMMENTS_QUANTITY_CHECKER + NEXT_QUANTITY_OF_COMMENTS;
};

const onCloseButtonClick = () => {
  modal.classList.add('hidden');
  commentsBlock.innerHTML = '';
  COMMENTS_QUANTITY_CHECKER = NEXT_QUANTITY_OF_COMMENTS;
  SHOWED_CHILDRENS = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
};

commentsLoader.addEventListener('click', onCommentsLoaderButtonClick);
picturesContainer.addEventListener('click', onPicturesContainerClick);

closeButton.addEventListener('click', onCloseButtonClick);
export { onPicturesContainerClick };
