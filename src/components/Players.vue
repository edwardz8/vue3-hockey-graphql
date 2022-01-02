<template>
  <div class="container mx-auto">
      <!-- pagination -->
        <!-- <div class="inline-flex mb-3">
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              Prev
            </button>
            <button @click="loadMore" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              Next
            </button>
        </div> -->
   <div class="relative text-gray-800 ml-4 mr-4 flex mb-2">
     <!-- <Search :search="searchQuery" @search="handleSearch" /> -->
     <input v-model="searchQuery" type="search" name="search" placeholder="Search   ⚾  player by name" class="h-10 px-5 pr-10 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border border-gray-300 outline-none focus:outline-none w-full pl-10">
      <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
        <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
        </svg>
      </button>
    </div>
    <div class="flex flex-col">
      <!-- table -->
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
                    Wins
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Losses
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Saves
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Games
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    ERA
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Hits
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
                    IP
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    K
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="pitcher in sortedPlayers" :key="pitcher.id">
                  <router-link :to="{ name: 'PitcherDetails', params: { id: pitcher.id } }">
                    <td class="px-4 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-5 w-5">
                          <i :class="matchTeamLogo(pitcher.team)"></i>
                          <!-- <span> ⚾ </span> -->
                        </div>
                        <div class="ml-4">
                          <div
                            class="text-sm font-medium hover:text-gray-900 text-gray-800"
                          >
                            {{ pitcher.name }}
                          </div>
                        </div>
                      </div>
                    </td>
                  </router-link>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ pitcher.team }}</div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-gray-800"
                    >
                      {{ pitcher.wins }}
                    </span>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ pitcher.losses }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ pitcher.saves }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ pitcher.games }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ pitcher.era }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ pitcher.hits }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ pitcher.home_runs_allowed }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ pitcher.innings_pitched }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ pitcher.strikeouts }}
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
import pitchersQuery from "../graphql/pitchers.query.gql";
import { watchEffect, computed, ref } from "vue";
import matchTeamLogo from "../methods";

export default {
  props: ['type'],
  setup(props) {
    const { result, loading, fetchMore } = useQuery(pitchersQuery, () => ({
      type: props.type,
      offset: 0,
      limit: 10
    }));

    const pitchers = useResult(result, [], (data) => data.pitchers);
    const searchQuery = ref('')

     const sortedPlayers = computed(() => {
        return pitchers.value.filter(
          pitcher => pitcher.name.toLowerCase().includes(searchQuery.value)
        )
    })

    /* function loadMore() {
      fetchMore({
        variables: {
          offset: result.pitchers.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult 

          return {
            ...previousResult,
            pitchers: [
              ...previousResult.pitchers,
              ...fetchMoreResult.pitchers
            ]
          }
        }
      })
    } */

    watchEffect(() => {
      console.log(pitchers.value);
    });

    return {
      pitchers,
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
