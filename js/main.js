const MINNUMIDPHOTO = 1;
const MAXNUMIDPHOTO = 25;
const MINNUMIDCOMMENT = 1;
const MAXNUMIDCOMMENT = 100;
const MINNUMURL = 15;
const MAXNUMURL = 200;
const MINNUMLIKES = 15;
const MAXNUMLIKES = 200;
const MINNUMAVATAR = 1;
const MAXNUMAVATAR = 6;
const MINNUMOFCOMMENTS = 0;
const MAXNUMOFCOMMENTS = 30;

const createId = (min, max) => {
  let currentValue = min - 1;

  return function addPlus() {
    if (currentValue <= max) {
      currentValue++;
    }
    return currentValue;
  };
};

const getRandomIntInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

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

const createIdPhoto = createId(MINNUMIDPHOTO, MAXNUMIDPHOTO);
const createIdComment = createId(MINNUMIDCOMMENT, MAXNUMIDCOMMENT);

const createQuantityOfComments = (quantity) => {
  const comments = [];
  for (let i = 0; i < quantity; i++) {
    comments.push({
      id: createIdComment(),
      avatar: `img/avatar-${getRandomIntInclusive(
        MINNUMAVATAR,
        MAXNUMAVATAR
      )}.svg`,
      message: COMMENTS[getRandomIntInclusive(0, COMMENTS.length - 1)],
      name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
    });
  }
  return comments;
};

const quantityOfPhotoPosts = 25;

const createPhotoPost = (quantity) => {
  const photoPosts = [];
  for (let i = 0; i < quantity; i++) {
    const photoPost = {
      id: createIdPhoto(),
      url: `photos/${getRandomIntInclusive(MINNUMURL, MAXNUMURL)}.jpg`,
      description: 'Просто невероятное фото!',
      likes: getRandomIntInclusive(MINNUMLIKES, MAXNUMLIKES),
      comments: createQuantityOfComments(
        getRandomIntInclusive(MINNUMOFCOMMENTS, MAXNUMOFCOMMENTS)
      ),
    };
    photoPosts.push(photoPost);
  }
  return photoPosts;
};
createPhotoPost(quantityOfPhotoPosts);
