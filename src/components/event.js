import {formatTime, formatDuration} from "../utils.js";

const createOfferMarkup = (offer) => {
  const {name, price} = offer;
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${name}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createOffersTemplate = (offers) => {
  const offersMarkup = offers.map((offer) => createOfferMarkup(offer)).join(`\n`);
  return (
    `<ul class="event__selected-offers">
      ${offersMarkup}
    </ul>`
  );
};

export const createEventTemplate = () => {
  const type = `taxi`;
  const destionation = `Amsterdam`;
  const dateStart = new Date(`2019-03-18T10:30`);
  const dateEnd = new Date(`2019-03-19T11:00`);
  const cost = 20;
  const offers = [{name: `Order Uber`, price: 20}, {name: `Rent a car`, price: 200}];

  const timeStart = formatTime(dateStart);
  const timeEnd = formatTime(dateEnd);
  const duration = formatDuration(new Date(dateEnd - dateStart));
  const offersList = offers ? createOffersTemplate(offers) : ``;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destionation}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart.toISOString()}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEnd.toISOString()}">${timeEnd}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${cost}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        ${offersList}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
