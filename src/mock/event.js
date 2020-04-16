export const cities = [`Amsterdam`, `Chamonix`, `Geneva`];
export const destionations = [
  {
    name: `Amsterdam`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    photos: `http://picsum.photos/248/152?r=1`,
  },
  {
    name: `Chamonix`,
    description: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    photos: `http://picsum.photos/248/152?r=2`,
  },
  {
    name: `Geneva`,
    description: `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    photos: `http://picsum.photos/248/152?r=3`,
  }
];
const placeholderTexts = [`Flight to`, `Taxi to`, `Sightseeing in`, `Restaurant in`];
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

// const event = {
//   type: eventTypes[0],
//   destintaion: ``,
//   dateStart: ``,
//   dateEnd: ``,
//   price: 1000,
//   offers: []
// };

const offers = [
  {
    name: `Order Uber`,
    type: `uber`,
    price: 20,
    checked: false
  },
  {
    name: `Add luggage`,
    type: `luggage`,
    price: 50,
    checked: false
  },
  {
    name: `Switch to comfort class`,
    type: `comfort`,
    price: 80,
    checked: false
  },
  {
    name: `Rent a car`,
    type: `car`,
    price: 200,
    checked: false
  },
  {
    name: `Add breakfast`,
    type: `breakfast`,
    price: 50,
    checked: false
  },
  {
    name: `Book tickets`,
    type: `tickets`,
    price: 40,
    checked: false
  },
  {
    name: `Lunch in city`,
    type: `lunch`,
    price: 30,
    checked: false
  },
  {
    name: `Add meal`,
    type: `meal`,
    price: 15,
    checked: false
  },
  {
    name: `Choose seats`,
    type: `seats`,
    price: 5,
    checked: false
  },
  {
    name: `Travel by train`,
    type: `train`,
    price: 40,
    checked: false
  },
];

export const generateEvents = () => {
  return [{
    type: `taxi`,
    destination: {
      name: `Amsterdam`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
      photos: [`http://picsum.photos/248/152?r=1`]
    },
    dateStart: new Date(`2019-03-18T10:30`),
    dateEnd: new Date(`2019-03-18T11:00`),
    price: 1000,
    offers: [
      {
        name: `Add breakfast`,
        type: `breakfast`,
        price: 50,
        checked: false
      },
      {
        name: `Book tickets`,
        type: `tickets`,
        price: 40,
        checked: false
      }
    ],
    isFavorite: true
  }];
};
