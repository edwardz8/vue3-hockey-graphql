<template>
  <div id="app">
    <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/table">Projections</router-link>
    <router-link to="/articles">Articles</router-link>
    <router-link to="/contact">About</router-link>
    </div>
  </div>
  <router-view/>
</template>


<style scoped>
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    font-size: 18px;
    color: #2c3e50;
    text-decoration: none !important;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  
  #nav a.router-link-exact-active {
    color: #002583;
    /* color: #4782e9; */
  }

  #nav a:hover {
    font-weight: bold;
    font-size: 18px;
    color: #4d7cf2 !important;
  }
</style>