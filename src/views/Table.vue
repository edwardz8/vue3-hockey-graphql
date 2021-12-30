<template>
  <div class="players mt-4">
    <h4 class="mb-1">Fungo Fantasy Baseball Projections 2022</h4>
    <p class="mb-2">Click on player name to view more stats</p>
    <div class="inline-flex mt-2 mb-4">
      <button
        @click="current = 'Players'"
        class="cursor-not-allowed bg-gray-300 hover:bg-green-300 text-gray-800 font-bold py-2 px-4 rounded-l"
      >
        Pitchers
      </button>
      <button
        @click="current = 'Players'"
        class="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Hitters
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
  color: #5c647b; 
}

a:hover {
  font-weight: bold;
  font-size: 18px;
  color: #787878 !important;
}
</style>
