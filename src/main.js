import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/assets/styles/tailwind.css'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

const getHeaders = () => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Origin": "https://studio.apollographql.com",
        "Access-Control-Allow-Origin": "https://studio.apollographql.com/sandbox/explorer",
        "Access-Control-Allow-Origin": "https://fungo-database.herokuapp.com/",
        "Access-Control-Allow-Credentials": true
    }
    /* const token = window.localStorage.getItem('0KDXheZ8pucFHRxlrPudZ3sNN5abkXahtDl3oAJzy7YoFYau2SqkWbN9eJUICG82')
    if (token) {
        headers.authorization = `Bearer ${token}`
    } */
    return headers
}

const httpLink = createHttpLink({
    // uri: 'http://localhost:4000/graphql',
    // uri: 'http://localhost:9090',
    uri: 'https://fungo-database.herokuapp.com/',
    // uri: 'https://rotorink.hasura.app/v1/graphql',
    fetch, 
    headers: getHeaders()
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
})

createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render() {
        return h(App)
    }
}).use(store).use(router).mount('#app')