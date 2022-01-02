<template>
  <div class="container mx-auto">
    <div class="relative text-gray-800 ml-4 mr-4 flex mb-2">
      <input v-model="searchQuery" type="search" name="search" placeholder="Search   ⚾  player by name" class="h-10 px-5 pr-10 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-300 outline-none focus:outline-none w-full pl-10">
      <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
        <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
        </svg>
      </button>
    </div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Team
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    War
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    PA
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    HR
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    SB
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    OPS
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="batter in sortedPlayers" :key="batter.id">
                  <router-link :to="{ name: 'BatterDetails', params: { id: batter.id } }">
                    <td class="px-4 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-5 w-5">
                          <i :class="matchTeamLogo(batter.team)"></i>
                          <!-- <span> ⚾ </span> -->
                        </div>
                        <div class="ml-4">
                          <div
                            class="text-sm font-medium hover:text-gray-900 text-gray-800"
                          >
                            {{ batter.name }}
                          </div>
                        </div>
                      </div>
                    </td>
                  </router-link>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ batter.team }}</div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-gray-800"
                    >
                      {{ batter.war }}
                    </span>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ batter.plate_appearances }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ batter.home_runs }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ batter.stolen_bases }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ batter.on_base_plus_slugging }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="loading">
            <div class="spinner-grow text-dark mt-6" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuery, useResult } from "@vue/apollo-composable";
import battersQuery from "../graphql/batters.query.gql";
import { watchEffect, ref, computed } from "vue";
import matchTeamLogo from "../methods";

export default {
  setup() {
    const { result, loading } = useQuery(battersQuery);
    const batters = useResult(result, [], (data) => data.batters);
    const searchQuery = ref('')

    watchEffect(() => {
      console.log(batters.value);
    });

    const sortedPlayers = computed(() => {
        return batters.value.filter(
          batter => batter.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    })

    return {
      batters,
      loading,
      sortedPlayers,
      searchQuery,
      ...matchTeamLogo,
    };
  },
};
</script>

<style scoped>
.progress-bar {
  height: 20px;
  color: black;
}
</style>
