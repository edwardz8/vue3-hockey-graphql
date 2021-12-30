<template>
  <div class="container mx-auto py-2">
    <div
      class="border m-6 rounded-lg bg-white mx-auto max-w-lg shadow-lg rounded-lg overflow-hidden"
    >
      <div class="clearfix sm:flex sm:items-center px-12 py-4 hover:bg-gray-300">
        <p
          class="logo xl:float-left lg:float-left xl:mr-4 lg:mr-4 md:mr-4 md:my-2 xl:my-2 lg:my-2"
        >
          <i :class="matchTeamLogo(pitcher.team)"></i>
        </p>
        <div class="text-center sm:text-left sm:flex-grow" v-if="pitcher">
          <div class="mb-4">
            <p class="font-sans text-xl leading-tight mb-2">{{ pitcher.name }}</p>
            <p class="font-sans text-sm leading-tight text-grey-dark mb-2">
              {{ pitcher.team }}
            </p>
            <p class="font-sans text-sm leading-tight">
              Wins: {{ pitcher.wins }} - Losses: {{ pitcher.losses }}
            </p>
          </div>
          <div class="sm:flex sm:items-center flex-wrap">
            <button
              class="text-xs font-semibold rounded-full px-4 py-1 mx-3 leading-normal bg-white border border-blue text-blue hover:text-black"
            >
              Track
            </button>
            <router-link to="/">
              <button
                class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:text-black"
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
          :chart-data="pitcherData"
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
// import pitcherQuery from "../graphql/pitcher.query.gql";
import { useQuery, useResult } from "@vue/apollo-composable";
import { PolarAreaChart } from "vue-chart-3";
import matchTeamLogo from "../methods";

export default {
  name: "PitcherDetails",
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
      console.log(pitcherData.value, "pitcher chart data");
      console.log(pitcher.value, "pitcher data");
      data;
    });

    const data = ref(pitcher);
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
        query Pitcher($pitcherId: ID!) {
          pitcher(id: $pitcherId) {
            name
            team
            wins
            losses
            era
            games
            games_started
            saves
            innings_pitched
            hits
            earned_runs
            home_runs_allowed
            strikeouts
            walks
            whip
            ks_per_nine
            walks_per_nine
            fip
            war
            ra_nine_war
            adp
            id 
            __typename
          }
        }
      `,
      {
        pitcherId: props.id,
      }
    );

    const pitcher = useResult(result, null, (data) => data.pitcher);

    const pitcherData = computed(() => ({
      labels: ["Wins", "Losses", "Games", "Saves", "Home Runs Allowed"],
      datasets: [
        {
          data: [
            pitcher.value.wins,
            pitcher.value.losses,
            pitcher.value.games,
            pitcher.value.saves,
            pitcher.value.home_runs_allowed,
          ],
          backgroundColor: [
            "rgba(0, 187, 148, 0.42)",
            "rgba(106, 126, 177, 0.8)",
            "rgba(0, 151, 19, 0.3)",
            "rgba(255, 0, 15, 0.4)",
            "rgba(600, 200, 19, 0.3)",
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
      pitcherData,
      pitcher,
      ...matchTeamLogo,
    };
  },
};
</script>
