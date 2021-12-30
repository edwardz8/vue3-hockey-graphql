<script>
import { PolarArea, mixins } from "vue-chartjs";

export default {
  name: "chart",
  extends: PolarArea,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null
    },
  },
  mounted() {
    this.renderChart(
      {
        labels: ["Wins", "Losses", "Games", "Saves", "HRs Allowed"],
        datasets: [
          {
            label: this.chartData.player,
            backgroundColor: ["rgba(300, 400, 30, 0.3)", "rgba(300, 400, 30, 0.3)", "rgba(0, 151, 19, 0.3)", "rgba(255, 0, 15, 0.4)", "rgba(600, 200, 19, 0.3)"],
            data: [this.chartData.wins, this.chartData.losses, this.chartData.games, this.chartData.saves, this.chartData.home_runs_allowed ],
          },
        ],
      },
      this.options
    );
  },
};
</script>
