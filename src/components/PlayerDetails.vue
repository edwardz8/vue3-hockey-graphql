<template>
  <div v-if="pitcher">
  <h1>{{ pitcher.player }}</h1>
  <h1>{{ pitcher.wins }}</h1>
  </div>
</template>

<script>
import { computed, watchEffect } from "vue";
import { useQuery } from '@vue/apollo-composable'
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

    const { pitcher } = useQuery(gql`
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

    watchEffect(() => {
      console.log(pitcher.value) // undefined
    })

    return {
      pitcher 
    };
  },
};
</script>