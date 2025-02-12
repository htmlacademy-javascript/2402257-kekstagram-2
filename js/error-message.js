const SHOW_ERROR_TIME = 5000;

const showErrorMessage = () => {
  const errorBlock = document.getElementById('data-error').content;
  const errorElement = errorBlock.cloneNode(true);
  const body = document.body;
  const errorNode = errorElement.querySelector('.data-error');
  body.appendChild(errorElement);

  setTimeout(() => {
    errorNode.remove();
  }, SHOW_ERROR_TIME);
};

export { showErrorMessage };
