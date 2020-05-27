import {FilterType} from "../const.js";

const getFuturePoints = (points, date) => {
  return points.filter((point) => point.dateStart > date);
};

const getPastPoints = (points, date) => {
  return points.filter((point) => point.dateStart < date);
};

const getFilteredPoints = (points, filterType) => {
  const date = Date.now();

  switch (filterType) {
    case FilterType.FUTURE:
      return getFuturePoints(points, date);
    case FilterType.PAST:
      return getPastPoints(points, date);
  }

  return points;
};

export {getFilteredPoints};
