const getRandomIntInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const arrayOfComments = [
  'Всё отлично!',
  'Вцелом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const arrayOfNames = [
  'Кирилл Темошка',
  'Сальвадор Беллучи',
  'Скуф Скуфович',
  'Евдокий Карбонарович',
  'Салам Салем',
  'Большая Мама',
  'Обыкновенный мох',
];

const createId = (min, max) => {
  const previousCreatedId = [];

  return function () {
    let currentValue = getRandomIntInclusive(min, max);

    while (previousCreatedId.includes(currentValue)) {
      currentValue = getRandomIntInclusive(min, max);
    }
    previousCreatedId.push(currentValue);

    return currentValue;
  };
};

const getPhotoId = createId(1, 25);
const getCommentId = createId(1, 100);

const createObject = () => {
  const newObject = {
    id: getPhotoId(),
    url: `photos/${getRandomIntInclusive(15, 200)}.jpg`,
    description: 'Просто невероятное фото!',
    likes: getRandomIntInclusive(15, 200),
    comments: {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
      message:
        arrayOfComments[getRandomIntInclusive(0, arrayOfComments.length - 1)],
      name: arrayOfNames[getRandomIntInclusive(0, arrayOfNames.length - 1)],
    },
  };
  return newObject;
};
createObject();
