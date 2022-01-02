<template>
  <div id="app container mx-auto">
    <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/table">Stats</router-link>
<!--     <router-link to="/articles">Stories</router-link> -->    
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
    color: #4d8f7a;
    text-decoration: none !important;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  
  #nav a.router-link-exact-active {
    color: #5c647b;
  }

  #nav a:hover {
    font-weight: bold;
    font-size: 18px;
    color: #5c647b !important;
  }
</style>