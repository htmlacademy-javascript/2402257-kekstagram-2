import { createPhotoPost } from './photopost.js';
import { createMiniature, photosData } from './miniature.js';
import { modal } from './modal.js';
const QUANTITY_OF_PHOTO_POSTS = 25;

createPhotoPost(QUANTITY_OF_PHOTO_POSTS);
createMiniature(photosData);
