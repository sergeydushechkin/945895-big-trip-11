import {EVENT_TYPES, OFFERS} from "../const.js";
import {getRandomArrayElement, getRandomIntegerNumber} from "../utils/common.js";

export const cities = [`Amsterdam`, `Chamonix`, `Geneva`, `Moscow`, `London`];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const getDestinations = () => {
  return cities.map((city) => {
    let description = ``;
    for (let i = 0; i < getRandomIntegerNumber(1, 5); i++) {
      description = `${description} ${getRandomArrayElement(descriptions)}`;
    }

    let photos = [];
    for (let i = 0; i < getRandomIntegerNumber(1, 5); i++) {
      photos.push(`http://picsum.photos/248/152?r=${getRandomIntegerNumber(1, 50)}`);
    }

    return {
      name: city,
      description,
      photos
    };
  });
};

const getRandomDate = (baseDate) => {
  let randomDate;
  if (baseDate) {
    randomDate = baseDate + Math.round((60 * 60 * getRandomIntegerNumber(0.4, 10) + (60 * getRandomIntegerNumber(30, 60))) * 1000);
  } else {
    randomDate = Date.now() - Math.round((60 * 60 * getRandomIntegerNumber(7, 32) + (60 * getRandomIntegerNumber(30, 60))) * 1000);
  }

  return randomDate;
};

const generatePointsOffers = (type) => {
  let pointOffers = [];
  OFFERS[type].forEach((offer) => {
    if (Math.random() > 0.5) {
      pointOffers.push(Object.assign({}, offer));
    }
  });
  return pointOffers;
};

const generatePoint = (dateStart, dateEnd) => {
  const type = getRandomArrayElement(EVENT_TYPES);
  return {
    id: Date.now().toString() + Math.random(),
    type,
    destination: getRandomArrayElement(destinationsList).name,
    dateStart,
    dateEnd,
    price: getRandomIntegerNumber(20, 200),
    offers: generatePointsOffers(type),
    isFavorite: Math.random() > 0.5
  };
};

export const generatePoints = (count) => {
  let firstDate = getRandomDate();
  let secondDate = getRandomDate(firstDate);
  return new Array(count)
    .fill(``)
    .map(() => {
      firstDate = secondDate + (getRandomIntegerNumber(5, 60) * 60 * 1000);
      secondDate = getRandomDate(firstDate);
      return generatePoint(firstDate, secondDate);
    })
    .sort((a, b) => a.dateStart > b.dateStart ? 1 : -1);
};

export const destinationsList = getDestinations();
