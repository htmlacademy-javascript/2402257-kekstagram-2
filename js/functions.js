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
  const resultArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!isNaN(array[i]) && array[i] !== ' ') {
      resultArray.push(array[i]);
    }
  }

  return resultArray.length === 0 ? NaN : resultArray.join('');
}
checkIfNumber('анапа 2007');

const convertTimeStringInMinutes = (string) => {
  const [hour, minute] = string.split(':').map(Number);
  return hour * 60 + minute;
};

function checkMeeting(startTime, endTime, startTimeOfMeeting, meetingTime) {
  const meetingTimeString = meetingTime.toString();
  const timeBoard = [startTime, endTime, startTimeOfMeeting];
  const timeBoardInMinutes = [];

  for (let i = 0; i <= timeBoard.length - 1; i++) {
    const time = timeBoard[i];
    const minutesTotal = convertTimeStringInMinutes(time);
    timeBoardInMinutes.push(minutesTotal);
  }
  const [workDayStart, workDayEnd, meetingStartTime] = timeBoardInMinutes;

  timeBoardInMinutes.push(meetingTimeString);

  if (
    workDayEnd - meetingStartTime - meetingTime >= 0 &&
    meetingStartTime >= workDayStart
  ) {
    return true;
  }
  return false;
}

checkMeeting('14:00', '17:30', '08:0', 90);
