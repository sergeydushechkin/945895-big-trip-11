import moment from "moment";

const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const formatFullDate = (date) => {
  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

const formatDateReverse = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

const formatDuration = (dateFirst, dateSecond) => {
  const duration = moment.duration(moment(dateSecond).diff(dateFirst));

  const days = duration.days() ? duration.days() + `D ` : ``;
  const hours = days || duration.hours() ? duration.hours() + `H ` : ``;
  const minutes = duration.minutes();

  return `${days}${hours}${minutes}M`;
};

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);


export {formatTime, formatFullDate, formatDateReverse, formatDuration, capitalizeFirstLetter};
