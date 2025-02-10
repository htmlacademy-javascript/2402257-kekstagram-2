const showErrorMessage = (errorId, errorClass, errorTime) => {
  const errorBlock = document.getElementById(errorId).content;
  const errorElement = errorBlock.cloneNode(true);
  const body = document.body;
  const errorNode = errorElement.querySelector(errorClass);
  body.appendChild(errorElement);

  setTimeout(() => {
    errorNode.remove();
  }, errorTime);
};

export { showErrorMessage };
