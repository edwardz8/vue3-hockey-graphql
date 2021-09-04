import { createStore } from 'vuex'
// import playerPros from '../assets/players_2021_JSON.json'

export default createStore({
  state: {
    playerList: [],
    // players: playerPros,
    // player: {},
    search: ''
  },
  getters: {
    players: (state) => {
      return state.playerList;
    },
    player: (state) => (id) => {
      return state.playerList.find((player) => player.id === id);
    },
    // getplayers: state => state.players,
    // getplayer: state => state.player 
    /* getplayer: (state) => (id) => {
      return state.players.find((player) => player.playerid === id);
    },  */
  },
  mutations: {
    CURRENT_PLAYER(state, player) {
      state.player = player 
    }
  },
  actions: {
    currentplayer: (context, player) => {
      context.commit('CURRENT_PLAYER', player.playerid)
    }
  },
  modules: {}
})