const EVENT_PREP = {
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

const MONTH_NAMES = [
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

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export {EVENT_PREP, MONTH_NAMES, FilterType};
