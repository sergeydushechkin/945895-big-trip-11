import moment from "moment";

export const getRandomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const getRandomIntegerNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const castTimeFormat = (value) =>
  value < 10 ? `0${value}` : String(value);

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatFullDate = (date) => {
  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

export const formatDateReverse = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

const formatDurationTime = (date) => {
  const hours = castTimeFormat(date.getUTCHours());
  const minutes = castTimeFormat(date.getUTCMinutes());

  return `${hours}H ${minutes}M`;
};

export const formatDuration = (dateFirst, dateSecond) => {
  // let duration = ``;
  // const date = new Date(dateSecond - dateFirst);

  // if (date >= 86400000) {
  //   duration = `${castTimeFormat(Math.floor(date / 1000 / 60 / 60 / 24))}D ${formatDurationTime(date)}`;
  // } else if (date >= 3600000) {
  //   duration = `${formatDurationTime(date)}`;
  // } else {
  //   duration = `${Math.round(date / 1000 / 60)}M`;
  // }
  // return duration;

  const duration = moment.duration(moment(dateSecond).diff(dateFirst));

  const days = Math.floor(duration.asDays());
  const hours = Math.floor(duration.asHours()) - days * 24;
  const minutes = Math.floor(duration.asMinutes()) - hours * 60;
  return `${days}D ${hours}H ${minutes}M`;
};

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
