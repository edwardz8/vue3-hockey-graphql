import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/tailwind.css'
import './index.css'

import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  })
  
/*   const query = gql`
      query {
          pitchers {
              player
              team
              strikeouts
              wins
              innings_pitched
          }
      }
  `
  
  apolloClient.query({
      query
  })
      .then(res => console.log(res)) */
  
  createApp({
      setup() {
          provide(DefaultApolloClient, apolloClient)
      },
      render() { return h(App) }
  }).use(store).use(router).mount('#app')