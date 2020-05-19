import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

const createStatsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class StatsComponents extends AbstractSmartComponent {
  getTemplate() {
    return createStatsTemplate();
  }

  _renderCharts() {
    const moneyCtx = document.querySelector(`.statistic__money`);
    const transportCtx = document.querySelector(`.statistic__transport`);
    const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeSpendCtx.height = BAR_HEIGHT * 4;


  }
}
