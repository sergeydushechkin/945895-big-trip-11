export const EVENT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];

export const EVENT_PREP = {
  [`taxi`]: `to`,
  [`bus`]: `to`,
  [`train`]: `to`,
  [`ship`]: `to`,
  [`transport`]: `to`,
  [`drive`]: `to`,
  [`flight`]: `to`,
  [`check-in`]: `in`,
  [`sightseeing`]: `in`,
  [`restaurant`]: `in`
};

export const OFFERS = {
  taxi:
  [
    {name: `Order Uber`, price: 20},
    {name: `Switch to comfort class`, price: 80}
  ],
  bus:
  [
    {name: `Add luggage`, price: 50},
    {name: `Switch to comfort class`, price: 80}
  ],
  train:
  [
    {name: `Switch to comfort class`, price: 80},
    {name: `Add breakfast`, price: 50}
  ],
  ship:
  [
    {name: `Add luggage`, price: 50},
    {name: `Switch to comfort class`, price: 80},
    {name: `Add breakfast`, price: 50}
  ],
  transport:
  [
    {name: `Add luggage`, price: 50},
    {name: `Add breakfast`, price: 50}
  ],
  drive:
  [
    {name: `Rent a car`, price: 200}
  ],
  flight:
  [
    {name: `Add luggage`, price: 50},
    {name: `Add breakfast`, price: 50}
  ],
  [`check-in`]:
  [
    {name: `Add luggage`, price: 50},
    {name: `Add breakfast`, price: 50}
  ],
  sightseeing:
  [
    {name: `Order Uber`, price: 20},
    {name: `Rent a car`, price: 200},
  ],
  restaurant:
  []
};

export const MONTH_NAMES = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Augu`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`
];
