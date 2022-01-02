<template>
  <div class="container mx-auto py-2">

    <div
      class="border m-6 rounded-lg bg-white mx-auto max-w-lg shadow-lg rounded-lg overflow-hidden"
    >
      <div class="clearfix sm:flex sm:items-center px-12 py-4 bg-gray-200">
        <div class="text-center sm:text-left sm:flex-grow" v-if="batter">
          <div class="mb-4">
            <p class="font-sans text-xl leading-tight mb-2">{{ batter.name }}</p>
            <p class="font-sans text-xl leading-tight text-grey-dark mb-2">
              <i :class="matchTeamLogo(batter.team)"></i>
            </p>
            <p class="font-sans text-md leading-tight">
              Walks: {{ batter.walks }} - Triples: {{ batter.triples }} 
            </p>
            <p class="font-sans text-md text-blue-700 leading-tight">
              Strikeouts: {{ batter.strikeouts }} 
            </p>
            <p class="font-sans text-md leading-tight">
              WAR: {{ batter.war }}
            </p>
            <p class="font-sans text-md leading-tight">
              Hits: {{ batter.hits }} 
            </p>
          </div>
          <div>
            <router-link to="/">
              <button
                class="text-sm font-semibold rounded-full px-6 py-2 leading-normal bg-gray-300 border border-purple text-purple hover:bg-gray-100 hover:text-black"
              >
                All Players
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-container">
      <!-- <div v-if="$apollo.loading">Loading...</div> -->
      <div>
        <!--  <chart :chart-data="player" :option="options" :height="300" /> -->
        <!-- <bar-chart :chart-data="chartData" :option="options" :height="300" /> -->
        <PolarAreaChart
          ref="polarRef"
          :chart-data="batterData"
          :options="options"
          :height="280"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onRenderTriggered } from "vue";
import gql from "graphql-tag";
import { useQuery, useResult } from "@vue/apollo-composable";
import { PolarAreaChart } from "vue-chart-3";
import matchTeamLogo from "../methods";

export default {
  name: "batterDetails",
  components: { PolarAreaChart },
  props: {
    id: { type: Number },
  },
  data() {
    return {
      chartData: null,
      options: { responsive: false, maintainAspectRatio: false },
      height: 100,
    };
  },
  setup(props) {
    onRenderTriggered(() => {
      console.log(batterData.value, "batter chart data");
      console.log(batter.value, "batter data");
      data;
    });

    const data = ref(batter);
    const polarRef = ref();
    const height = ref(100);

    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Player Projections",
        },
        maintainAspectRatio: false,
      },
    });

    const myStyles = computed(() => {
      return {
        height: `${height}.px`,
        position: "relative",
      };
    });

    const { result, loading, error } = useQuery(
      gql`
        query Batter($batterId: ID!) {
          batter(id: $batterId) {
            name
            team
            war
            adp
            id
            games
            plate_appearances
            at_bats
            hits
            doubles
            triples
            home_runs
            runs
            rbi
            walks
            strikeouts
            hit_by_pitch
            stolen_bases
            caught_stealing
            batting_average
            on_base_percentage
            slugging_percentage
            on_base_plus_slugging
            weighted_on_base_average
            weighted_runs_created_plus
            base_running
            fielding_percentage
            offensive_runs_above_average
            defensive_runs_above_average
          }
        }
      `,
      {
        batterId: props.id,
      }
    );

    const batter = useResult(result, null, (data) => data.batter);

    const batterData = computed(() => ({
      labels: ["RBI", "HR", "2B", "3B", "Runs", "SB"],
      datasets: [
        {
          data: [
            batter.value.rbi,
            batter.value.home_runs,
            batter.value.doubles,
            batter.value.triples,
            batter.value.runs,
            batter.value.stolen_bases,
          ],
          backgroundColor: [
            "rgba(170, 170, 249, 100)",
            "rgba(69, 255, 181, 0.7)",
            "rgba(0, 151, 19, 0.3)",
            "rgba(600, 200, 19, 0.3)",
            "rgba(148, 187, 233, 0.8)",
            "rgba(255, 132, 132, 100)",
          ],
        },
      ],
    }));

    return {
      result,
      loading,
      error,
      props,
      options,
      height,
      myStyles,
      polarRef,
      batterData,
      batter,
      ...matchTeamLogo,
    };
  },
};
</script>
