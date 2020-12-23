<template>
  <div>
  <h1>{{ pitcher.pitcher.player }}</h1>
  <h1>{{ pitcher.pitcher.wins }}</h1>
  </div>
</template>

<script>
import { computed, watchEffect } from "vue";
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag';

export default {
  name: "PlayerDetails",
  props: {
    playerid: { type: String },
  },
  setup(props) {
    /* const player = computed(() => {
      return store.getters.pitcher(Number(props.playerId));
    }); */

    const { result } = useQuery(gql`
        query pitcher ($playerid: ID!) {
          pitcher (playerid: $playerid) {
            player
            playerid 
            team
            wins
          }
        }
    `, () => ({
      playerid: props.playerid
    }))

    // const { result } = useQuery(pitcherQuery);

    const pitcher = useResult(result, null, (data) => data.pitcher)

    watchEffect(() => {
      console.log(result.value) // undefined
    })

    return {
      result,
      pitcher
    };
  },
};
</script>