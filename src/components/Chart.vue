<template>
<div v-if="chartData">
  <vue-highcharts
    type="chart"
    :options="chartData"
    :redrawOnUpdate="true"
    :oneToOneUpdate="false"
    :animateOnUpdate="true"
  />
  </div>
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

    watch(() => {
      console.log(result.value); // undefined
    });

    const chartData = computed(() => {
      if (pitcher) {
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
              data: pitcher.wins,
              pointPlacement: "between",
            },
            {
              type: "line",
              name: "Innings Pitched",
              data: pitcher.innings_pitched,
            },
            {
              type: "area",
              name: "Strikeouts",
              data: pitcher.strikeouts,
            },
          ],
        };
      }
    });

    return {
      result,
      pitcher,
      chartData,
    };
  },
};
</script>

<style scoped>
.vue-highcharts {
  width: 100%;
}
</style>
