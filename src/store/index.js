import { createStore } from 'vuex'
// import pitcherPros from '../assets/pitchers_2021_JSON.json'

export default createStore({
  state: {
    pitcherList: [],
    // pitchers: pitcherPros,
    // pitcher: {},
    search: ''
  },
  getters: {
    pitchers: (state) => {
      return state.pitcherList;
    },
    pitcher: (state) => (id) => {
      return state.pitcherList.find((pitcher) => pitcher.id === id);
    },
    // getPitchers: state => state.pitchers,
    // getPitcher: state => state.pitcher 
    /* getPitcher: (state) => (id) => {
      return state.pitchers.find((pitcher) => pitcher.playerid === id);
    },  */
  },
  mutations: {
    CURRENT_PITCHER(state, pitcher) {
      state.pitcher = pitcher 
    }
  },
  actions: {
    currentPitcher: (context, pitcher) => {
      context.commit('CURRENT_PITCHER', pitcher.playerid)
    }
  },
  modules: {}
})