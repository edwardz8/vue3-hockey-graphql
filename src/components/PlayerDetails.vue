<template>
  <div class="container mx-auto py-2">
    <div
      class="border m-6 rounded-lg bg-white mx-auto max-w-lg shadow-lg rounded-lg overflow-hidden"
    >
      <div class="clearfix sm:flex sm:items-center px-12 py-4 hover:bg-gray-300">
        <p
          class="logo xl:float-left lg:float-left xl:mr-4 lg:mr-4 md:mr-4 md:my-2 xl:my-2 lg:my-2"
        >
          <!-- <i :class="matchTeamLogo(player.team)"></i> -->
        </p>
        <div class="text-center sm:text-left sm:flex-grow" v-if="player">
          <div class="mb-4">
            <p class="font-sans text-xl leading-tight mb-2">{{ player.name }}</p>
            <p class="font-sans text-sm leading-tight text-grey-dark mb-2">
              {{ player.team }}
            </p>
            <p class="font-sans text-sm leading-tight">
              Assists: {{ player.assists }} - Goals: {{ player.goals }}
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
          :chart-data="playerData"
          :option="options"
          :height="300"
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

export default {
  name: "PlayerDetails",
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
      console.log(playerData.value, "player chart data");
      console.log(player.value, "player data");
      console.log(data.value, "data");
      console.log(playerComputed, "player computed data");
      playerData;
    });

    const data = ref(playerData)
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

    const playerComputed = computed({
      get: () => player.value,
      set: (val) => {
        player.value = val;
      },
    });

    const { result, loading, error } = useQuery(
      gql`
        query player($id: Int!) {
          player: players_by_pk(id: $id) {
            name
            id
            team
            goals
            assists
            points
            hits
          }
        }
      `,
      {
        id: props.id,
      }
    );
    const player = useResult(result, null, (data) => data.player);

    const playerData = computed(() => ({
      labels: ["Goals", "Assists", "Shots", "Hits", "Points"],
      datasets: [
        {
          data: [player.goals, player.assists, player.sog, player.hits, player.points],
          backgroundColor: [
            "rgba(300, 400, 30, 0.3)",
            "rgba(300, 400, 30, 0.3)",
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
      playerData,
      playerComputed,
      player
    };
  },
};
</script>
