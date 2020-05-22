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

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const OFFERS = {
  taxi:
  [
    {title: `Order Uber`, price: 20},
    {title: `Switch to comfort class`, price: 80}
  ],
  bus:
  [
    {title: `Add luggage`, price: 50},
    {title: `Switch to comfort class`, price: 80}
  ],
  train:
  [
    {title: `Switch to comfort class`, price: 80},
    {title: `Add breakfast`, price: 50}
  ],
  ship:
  [
    {title: `Add luggage`, price: 50},
    {title: `Switch to comfort class`, price: 80},
    {title: `Add breakfast`, price: 50}
  ],
  transport:
  [
    {title: `Add luggage`, price: 50},
    {title: `Add breakfast`, price: 50}
  ],
  drive:
  [
    {title: `Rent a car`, price: 200}
  ],
  flight:
  [
    {title: `Add luggage`, price: 50},
    {title: `Add breakfast`, price: 50}
  ],
  [`check-in`]:
  [
    {title: `Add luggage`, price: 50},
    {title: `Add breakfast`, price: 50}
  ],
  sightseeing:
  [
    {title: `Order Uber`, price: 20},
    {title: `Rent a car`, price: 200},
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
