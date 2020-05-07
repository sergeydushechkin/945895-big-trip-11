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

export const EVENT_OFFERS = {
  [`taxi`]: [`uber`, `comfort`],
  [`bus`]: [`comfort`, `luggage`],
  [`train`]: [`comfort`, `breakfast`],
  [`ship`]: [`comfort`, `luggage`, `breakfast`],
  [`transport`]: [`luggage`, `breakfast`],
  [`drive`]: [`car`],
  [`flight`]: [`luggage`, `breakfast`],
  [`check-in`]: [`luggage`, `breakfast`],
  [`sightseeing`]: [`car`, `uber`],
  [`restaurant`]: []
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
