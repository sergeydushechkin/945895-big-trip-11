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
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  let result = `${days ? days + `D ` : ``}${hours || days ? hours + `H ` : ``}${minutes}M`;

  return result;
};

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
