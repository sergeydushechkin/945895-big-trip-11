import moment from "moment";

export const getRandomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const getRandomIntegerNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatFullDate = (date) => {
  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

export const formatDateReverse = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const formatDuration = (dateFirst, dateSecond) => {
  const duration = moment.duration(moment(dateSecond).diff(dateFirst));
  const days = Math.floor(duration.asDays());
  const hours = Math.floor(duration.asHours()) % 24;
  const minutes = Math.floor(duration.asMinutes()) % 60;

  let result = ``;

  if (days) {
    result = `${days}D ${hours}H ${minutes}M`;
  } else if (hours) {
    result = `${hours}H ${minutes}M`;
  } else {
    result = `${minutes}M`;
  }

  return result;
};

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
