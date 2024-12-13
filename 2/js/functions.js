function checkMaxLengthOfString(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
}

function checkPolindrom(string) {
  const array = string.split("").filter((letter) => letter !== " ");
  const arrayLength = Math.floor(array.length / 2);
  const leftSide = array.slice(0, arrayLength);

  const rightSide = array.reverse().slice(0, arrayLength);

  if (leftSide.toString() === rightSide.toString()) {
    return true;
  } else {
    return false;
  }
}

function checkIfNumuber(string) {
  const array = string.split("");
  let resultArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!isNaN(array[i]) && array[i] !== " ") {
      resultArray.push(array[i]);
    }
  }

  if (resultArray.length === 0) {
    return NaN;
  } else {
    return resultArray.filter((letter) => letter !== " ").join("");
  }
}
