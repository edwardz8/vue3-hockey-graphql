<template>
  <div class="players mt-4">
    <h4 class="mb-1">Rotorink Hockey Player Projections 2021-22</h4>
    <p class="mb-2">Click on player name to view more stats</p>
    <div class="inline-flex mt-2 mb-4">
      <button
        @click="current = 'Players'"
        class="cursor-not-allowed bg-gray-300 hover:bg-red-300 text-gray-800 font-bold py-2 px-4 rounded-l"
      >
        Goalies
      </button>
      <button
        @click="current = 'Players'"
        class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Skaters
      </button>
    </div>

    <!--  <Players/> -->
    <component :is="current"></component>
  </div>
</template>

<script>
// import Batters from "@/components/Batters.vue";
import Players from "@/components/Players.vue";

export default {
  name: "Table",
  data() {
    return {
      current: "Players",
    };
  },
  components: {
    Players,
  },
};
</script>

<style scoped>
a {
  font-weight: bold;
}

a:hover {
  font-weight: bold;
  font-size: 18px;
  color: #4d7cf2 !important;
}
</style>
