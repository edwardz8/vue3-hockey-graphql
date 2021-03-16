<template>
  <div>
    <vue-highcharts
      type="chart"
      :options="chartData"
      :redrawOnUpdate="true"
      :oneToOneUpdate="false"
      :animateOnUpdate="true"
      @rendered="onRender"
    />
  </div>
</template>

<script>
import { computed, watchEffect } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import VueHighcharts from "vue3-highcharts";
import HighCharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import { onBeforeMount } from 'vue-demi';

HighchartsMore(HighCharts);

export default {
  name: "chart",
  components: {
    VueHighcharts,
  },
  props: {
    id: { type: Number },
    pitcher: {
      type: Object,
    },
  },
  setup(props) {
    const { result } = useQuery(
      gql`
        query pitcher($id: Int!) {
          pitcher(id: $id) {
            player
            id
            team
            innings_pitched
            strikeouts
            wins
            era
            war
            home_runs_allowed
            fip
          }
        }
      `,
      props,
      {}
    );

    const pitcher = useResult(result, null, (data) => data.pitcher);

    const chartData = computed(() => {
      if (pitcher.value) {
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
              pointInterval: 20,
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
              data: pitcher.value.wins,
              pointPlacement: "between",
            },
            {
              type: "line",
              name: "Innings Pitched",
              data: pitcher.value.innings_pitched,
            },
            {
              type: "area",
              name: "Strikeouts",
              data: pitcher.value.strikeouts,
            },
          ],
        };
      }
    });

    const onRender = () => {
      console.log("Chart rendered", result.value);
      console.log("Chart rendered", pitcher.value);
      chartData
    };

    onBeforeMount(() => {
      console.log(result.value, 'result value from chart');
      console.log(pitcher.value.innings_pitched, 'innings_pitched from chart')
      chartData
    });

    watchEffect(() => {
      // console.log(pitcher.value); // undefined
      chartData
    });

    return {
      pitcher,
      onRender,
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
