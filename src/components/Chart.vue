<template>
  <vue-highcharts
    type="chart"
    :options="chartData"
    :redrawOnUpdate="true"
    :oneToOneUpdate="false"
    :animateOnUpdate="true"
  />
</template>

<script>
import { computed, watch } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import VueHighcharts from "vue3-highcharts";
import HighCharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(HighCharts);

export default {
  name: "chart",
  components: {
    VueHighcharts,
  },
  props: {
    playerid: { type: Number },
  },
  setup(props) {
    const { result } = useQuery(
      gql`
        query pitcher($playerid: Int!) {
          pitcher(playerid: $playerid) {
            player
            playerid
            team
            innings_pitched
            strikeouts
            wins
          }
        }
      `,
      props
    );

    const pitcher = useResult(result, null, (data) => data.pitcher);

    // const data = reactive([pitcher.wins, pitcher.innings_pitched, pitcher.strikeouts])

    watch(() => {
      console.log(result.value); // undefined
    });

    const chartData = computed(() => {
      return {
        chart: {
          polar: true,
        },
        title: {
          text: "Player Projection",
        },
        pane: {
          startAngle: 0,
          endAngle: 360,
        },
        xAxis: {
          tickInterval: 20,
          min: 0,
          max: 260,
          labels: {
            format: "{value}",
          },
        },
        yAxis: {
          min: 0,
        },
        plotOptions: {
          series: {
            pointStart: 0,
            pointInterval: 45,
          },
          column: {
            pointPadding: 0,
            groupPadding: 0,
          },
        },

        series: [
          {
            type: "column",
            name: "Wins",
            data: [8, 7, 6, 5, 4, 3, 2, 1],
            pointPlacement: "between",
          },
          {
            type: "line",
            name: "Innings Pitched",
            data: [1, 2, 3, 4, 5, 6, 7, 8],
          },
          {
            type: "area",
            name: "Strikeouts",
            data: [1, 8, 2, 7, 3, 6, 4, 5],
          },
        ],
      };
    });

    return {
      result,
      pitcher,
      chartData
    };
  },
};
</script>

<style scoped>
.vue-highcharts {
  width: 100%;
}
</style>
