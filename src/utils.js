export const getRandomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const getRandomIntegerNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const castTimeFormat = (value) =>
  value < 10 ? `0${value}` : String(value);

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatFullDate = (date) => {
  const day = castTimeFormat(date.getDate());
  const month = castTimeFormat(date.getMonth() + 1);
  const year = date.getYear();
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const formatDurationTime = (date) => {
  const hours = castTimeFormat(date.getUTCHours());
  const minutes = castTimeFormat(date.getUTCMinutes());

  return `${hours}H ${minutes}M`;
};

export const formatDuration = (date) => {
  let duration = ``;
  if (date >= 86400000) {
    duration = `${castTimeFormat(Math.floor(date / 1000 / 60 / 60 / 24))}D ${formatDurationTime(date)}`;
  } else if (date >= 3600000) {
    duration = `${formatDurationTime(date)}`;
  } else {
    duration = `${date / 1000 / 60}M`;
  }
  return duration;
};
