import {
  createMiniatures,
  photosData,
  userPhotoInterface,
} from './miniature.js';
import {} from './modal.js';

const createdPhotosElements = createMiniatures(photosData);

userPhotoInterface.append(createdPhotosElements);

// привет как дела?
