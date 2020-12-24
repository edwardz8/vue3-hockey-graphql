<template>
  <div>
    <h1>{{ pitcher.player }}</h1>
    <h1>{{ pitcher.wins }}</h1>
  </div>
</template>

<script>
import { computed, watchEffect } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  name: "PlayerDetails",
  props: {
    playerid: { type: Number },
  },
  setup(props) {
    const { result } = useQuery(
      gql`
        query pitcher ($playerid: ID!) {
          pitcher (playerid: $playerid) {
            player
            playerid
            team
            wins
          }
        }
      `, props
    );

    const pitcher = useResult(result, (data) => data.pitcher);

    watchEffect(() => {
      console.log(result.value); // undefined
    });

    return {
      result,
      pitcher
    };
  },
};
</script>
