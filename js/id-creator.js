const createId = (initialId = 0) => {
  let currentId = initialId - 1;

  return () => ++currentId;
};

export { createId };
