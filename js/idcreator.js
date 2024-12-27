const createId = (initialId = 0) => {
  let currentId = initialId;

  return () => currentId++;
};

export { createId };
