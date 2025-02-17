import { initModal } from './modal.js';

const DEFAULT_FILTER = 'filter-default';

const POSTS_FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let originalData = '';
let currentData = '';

const userPhotoInterface = document.querySelector('.pictures');
const sample = document.querySelector('#picture').content;
const generatedPictures = document.createDocumentFragment();
const filtersContainer = document.querySelector('.img-filters');
let currentPostsFilter = DEFAULT_FILTER;

const discussedPostsFilter = (postA, postB) => {
  const rankA = postA.comments.length;
  const rankB = postB.comments.length;

  return rankB - rankA;
};

const randomPostsFilter = (posts) => {
  const randomPosts = posts.slice(0, 10);
  for (let i = randomPosts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomPosts[i], randomPosts[j]] = [randomPosts[j], randomPosts[i]];
  }
  return randomPosts;
};

const createMiniature = ({ comments, likes, url, description, id }) => {
  const clonedElement = sample.cloneNode(true);
  const clonedElementImg = clonedElement.querySelector('.picture__img');
  const clonedElementLink = clonedElement.querySelector('.picture');
  const clonedElementLikes = clonedElement.querySelector('.picture__likes');
  const clonedElementComments =
    clonedElement.querySelector('.picture__comments');

  clonedElementComments.textContent = comments.length;
  clonedElementLikes.textContent = likes;
  clonedElementImg.src = url;
  clonedElementImg.alt = description;
  clonedElementLink.dataset.id = id;
  generatedPictures.append(clonedElement);
};

const changeActiveButton = (evt) => {
  const activeFilter = document.querySelector('.img-filters__button--active');

  activeFilter.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const clearPostsInterface = () =>
  document.querySelectorAll('.picture').forEach((post) => post.remove());

const renderFilteredPosts = () => {
  clearPostsInterface();
  userPhotoInterface.append(createMiniatures(currentData));
};

const getActiveButtonFilterType = (evt) => (currentPostsFilter = evt.target.id);

const initPostsFilterInterface = (cb) => {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button')) {
      changeActiveButton(evt);
      getActiveButtonFilterType(evt);
      cb();
    }
  });
};

const filterPosts = (sortType, posts) => {
  if (sortType === POSTS_FILTERS.DEFAULT) {
    return originalData;
  }
  if (sortType === POSTS_FILTERS.RANDOM) {
    return randomPostsFilter(posts);
  }
  if (sortType === POSTS_FILTERS.DISCUSSED) {
    return posts.sort(discussedPostsFilter);
  }
};

function createMiniatures(posts) {
  filterPosts(currentPostsFilter, posts).forEach((post) => {
    createMiniature(post);
  });
  return generatedPictures;
}

const onUserPhotoInterfaceClick = (evt) => {
  if (
    evt.target.classList.contains('picture') ||
    evt.target.closest('.picture')
  ) {
    evt.preventDefault();

    const miniatureData = currentData.find(
      (photoData) => photoData.id === +evt.target.closest('.picture').dataset.id
    );
    initModal(miniatureData);
  }
};

userPhotoInterface.addEventListener('click', onUserPhotoInterfaceClick);

const generateUserInterface = (photosData) => {
  originalData = photosData.slice();
  userPhotoInterface.append(createMiniatures(photosData));
  currentData = photosData.slice();
};

export { generateUserInterface, initPostsFilterInterface, renderFilteredPosts };
