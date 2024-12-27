import { getRandomIntInclusive } from './util.js';
import { createComments } from './comment.js';
import { createId } from './idcreator.js';
const MIN_NUM_ID_PHOTO = 1;
const MAX_NUM_ID_PHOTO = 25;

const MIN_NUM_URL = 15;
const MAX_NUM_URL = 200;
const MIN_NUM_LIKES = 15;
const MAX_NUM_LIKES = 200;

const MIN_NUM_OF_COMMENTS = 0;
const MAX_NUM_OF_COMMENTS = 30;

const DESCRIPTION_TEXT = 'Просто невероятное фото!';

const createIdPhoto = createId(MIN_NUM_ID_PHOTO, MAX_NUM_ID_PHOTO);

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

export { createPhotoPost };
