const getRandomIntInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createId = (initialId = 0) => {
  let currentId = initialId - 1;

  return () => ++currentId;
};

export { getRandomIntInclusive, createId };
