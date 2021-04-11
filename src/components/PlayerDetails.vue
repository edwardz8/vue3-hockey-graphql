<template>
  <div class="container mx-auto py-2">
    <div
      class="border m-6 rounded-lg bg-white mx-auto max-w-lg shadow-lg rounded-lg overflow-hidden"
    >
      <div class="clearfix sm:flex sm:items-center px-12 py-4 hover:bg-gray-300">
        <p
          class="logo xl:float-left lg:float-left xl:mr-4 lg:mr-4 md:mr-4 md:my-2 xl:my-2 lg:my-2"
        >
          <!-- <i :class="matchTeamLogo(pitcher.team)"></i> -->
        </p>
        <div class="text-center sm:text-left sm:flex-grow" v-if="result && result.value">
          <div class="mb-4">
            <p class="font-sans text-xl leading-tight mb-2">{{ pitcher.player }}</p>
            <p class="font-sans text-sm leading-tight text-grey-dark mb-2">
              {{ pitcher.team }}
            </p>
            <p class="font-sans text-sm leading-tight">
              Wins: {{ result.wins }} - Innings: {{ pitcher.innings_pitched }}
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
      <div v-if="loading">Loading...</div>
      <!-- <div v-else-if="result && result.value">
        <chart />
      </div> -->
    </div>
  </div>
</template>

<script>
import { useQuery, useResult } from "@vue/apollo-composable";
import methods from "../methods";
import gql from "graphql-tag";
import { watchEffect } from "vue";
// import chart from "./Chart.vue";

export default {
  name: "PlayerDetails",
  // components: { chart },
  props: {
    id: { type: Number },
  },
  setup(props) {
    const { result, loading, error } = useQuery(
      gql`
        query pitcher ($id: ID!) {
          pitchers_by_pk (id: $id) {
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
      props
    );
    const pitcher = useResult(result, null, (data) => data.pitcher);

    watchEffect(() => {
      console.log(result.value, "result value"); // use this result?
      console.log(pitcher.value, "pitcher value"); // null initially 
    });

    return {
      pitcher,
      result,
      loading,
      error,
      result
    };
  },
  methods: {
    ...methods,
  },
};
</script>
