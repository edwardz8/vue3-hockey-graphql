import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/tailwind.css'
import './index.css'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

// const cache = new InMemoryCache()

const getHeaders = () => {
    const headers = {
        "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
    }
    const token = window.localStorage.getItem('ma3UdEKFb5zs0K0yyl019ahX6x3wC4k1Ra1MDCMeEj9d0W8fyaQHE576Y6193tTk')
    if (token) {
        headers.authorization = `Bearer ${token}`
    }
    return headers
}

// const BASEBALL_API = 'https://ethical-ostrich-26.hasura.app/v1/graphql'

const httpLink = createHttpLink({
    // uri: 'http://localhost:4000/graphql',
    uri: 'https://ethical-ostrich-26.hasura.app/v1/graphql',
    fetch,
    headers: getHeaders()
})


const apolloClient = new ApolloClient({
    link: httpLink,
    // link: new HttpLink({ uri: BASEBALL_API }),
    cache: new InMemoryCache(),
    connectToDevTools: true
  })

  createApp({
      setup() {
          provide(DefaultApolloClient, apolloClient)
      },
      render() { return h(App) }
  }).use(store).use(router).mount('#app')