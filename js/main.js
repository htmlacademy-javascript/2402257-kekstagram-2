const MIN_NUM_ID_PHOTO = 1;
const MAX_NUM_ID_PHOTO = 25;
const MIN_NUM_ID_COMMENT = 1;
const MAX_NUM_ID_COMMENT = 100;
const MIN_NUM_URL = 15;
const MAX_NUM_URL = 200;
const MIN_NUM_LIKES = 15;
const MAX_NUM_LIKES = 200;
const MIN_NUM_AVATAR = 1;
const MAX_NUM_AVATAR = 6;
const MIN_NUM_OF_COMMENTS = 0;
const MAX_NUM_OF_COMMENTS = 30;
const QUANTITY_OF_PHOTO_POSTS = 25;
const DESCRIPTION_TEXT = 'Просто невероятное фото!';

const COMMENTS = [
  'Всё отлично!',
  'Вцелом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Кирилл Темошка',
  'Сальвадор Беллучи',
  'Скуф Скуфович',
  'Евдокий Карбонарович',
  'Салам Салем',
  'Большая Мама',
  'Обыкновенный мох',
];

const createId = (initialId = 0) => {
  let currentId = initialId - 1;

  return () => ++currentId;
};

const getRandomIntInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createIdPhoto = createId(MIN_NUM_ID_PHOTO, MAX_NUM_ID_PHOTO);
const createIdComment = createId(MIN_NUM_ID_COMMENT, MAX_NUM_ID_COMMENT);

const createComments = (quantity) => {
  const comments = [];
  for (let i = 0; i < quantity; i++) {
    comments.push({
      id: createIdComment(),
      avatar: `img/avatar-${getRandomIntInclusive(
        MIN_NUM_AVATAR,
        MAX_NUM_AVATAR
      )}.svg`,
      message: COMMENTS[getRandomIntInclusive(0, COMMENTS.length - 1)],
      name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
    });
  }
  return comments;
};

const createPhotoPost = (quantity) => {
  const photoPosts = [];
  for (let i = 0; i < quantity; i++) {
    const photoPost = {
      id: createIdPhoto(),
      url: `photos/${getRandomIntInclusive(MIN_NUM_URL, MAX_NUM_URL)}.jpg`,
      description: DESCRIPTION_TEXT,
      likes: getRandomIntInclusive(MIN_NUM_LIKES, MAX_NUM_LIKES),
      comments: createComments(
        getRandomIntInclusive(MIN_NUM_OF_COMMENTS, MAX_NUM_OF_COMMENTS)
      ),
    };
    photoPosts.push(photoPost);
  }
  return photoPosts;
};

createPhotoPost(QUANTITY_OF_PHOTO_POSTS);
