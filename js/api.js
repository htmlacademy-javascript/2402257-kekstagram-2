const showErrorMessage = () => {
  const errorBlock = document.querySelector('#data-error').content;
  const errorElement = errorBlock.cloneNode(true);
  const body = document.body;
  const errorNode = errorElement.querySelector('.data-error');
  body.appendChild(errorElement);

  setTimeout(() => {
    errorNode.remove();
  }, 5000);
};

const getUsersPhotoData = () =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .catch(() => {
      showErrorMessage();
    });

const postUsersForm = (userData) =>
  fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: userData,
  });
export { getUsersPhotoData, postUsersForm };
