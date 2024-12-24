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

function checkMeeting(startTime, endTime, startTimeOfMeeting, meetingTime) {
  const meetingTimeString = meetingTime.toString();
  const timeBoard = [startTime, endTime, startTimeOfMeeting];
  const timeBoardInMinutes = [];

  for (let i = 0; i <= timeBoard.length - 1; i++) {
    const time = timeBoard[i];
    const timeSplited = time.split(':');
    const hours = Number(timeSplited[0]);
    const minutes = Number(timeSplited[1]);
    const minutesTotal = hours * 60 + minutes;
    timeBoardInMinutes.push(minutesTotal);
  }
  const [workDayStart, workDayEnd, meetingStartTime, durationOfMeeting] =
    timeBoardInMinutes;

  timeBoardInMinutes.push(meetingTimeString);

  if (meetingStartTime < workDayStart) {
    return false;
  }
  if (workDayEnd - meetingStartTime - durationOfMeeting >= 0) {
    return true;
  }
  return false;
}

checkMeeting('8:0', '10:0', '8:0', 120);
