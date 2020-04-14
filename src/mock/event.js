const eventTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`];
const cities = [`Amsterdam`, `Chamonix`, `Geneva`];
const destionations = {
  name: cities[0],
  photos: `http://picsum.photos/248/152?r=${Math.random()}`,
};
const placeholderTexts = [`Flight to`, `Taxi to`, `Sightseeing in`, `Restaurant in`];
const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const event = {
  type: eventTypes[0],
  destintaion: ``,
  dateStart: ``,
  dateEnd: ``,
  cost: 1000,
  offers: []
};

const offers = [
  {
    name: `Order Uber`,
    price: 20
  },
  {
    name: `Add luggage`,
    price: 50
  },
  {
    name: `Switch to comfort`,
    price: 80
  },
  {
    name: `Rent a car`,
    price: 200
  },
  {
    name: `Add breakfast`,
    price: 50
  },
  {
    name: `Book tickets`,
    price: 40
  },
  {
    name: `Lunch in city`,
    price: 30
  },
];
