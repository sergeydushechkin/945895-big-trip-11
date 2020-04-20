export const createTripCostTemplate = (events) => {
  const cost = events
    .reduce((totalCost, event) => {
      return totalCost + event.price;
    }, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
};
