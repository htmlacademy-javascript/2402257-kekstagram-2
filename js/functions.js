function checkMaxLengthOfString(string, maxLength) {
  return string.length <= maxLength;
}
checkMaxLengthOfString('pe', 2);

function checkPolindrome(string) {
  const normalString = string.replaceAll(' ', '').toLowerCase();
  const reversedString = normalString.split('').reverse().join('');
  return normalString === reversedString;
}
checkPolindrome('Д овод');

function checkIfNumber(string) {
  const array = string.split('');
  let resultArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!isNaN(array[i]) && array[i] !== ' ') {
      resultArray.push(array[i]);
    }
  }

  return resultArray.length === 0 ? NaN : resultArray.join('');
}
