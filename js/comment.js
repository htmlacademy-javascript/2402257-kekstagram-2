import { getRandomIntInclusive } from './util.js';
import { createId } from './id-creator.js';
const MIN_NUM_ID_COMMENT = 1;
const MAX_NUM_ID_COMMENT = 100;
const MIN_NUM_AVATAR = 1;
const MAX_NUM_AVATAR = 6;
const createIdComment = createId(MIN_NUM_ID_COMMENT, MAX_NUM_ID_COMMENT);
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

export { createComments };
