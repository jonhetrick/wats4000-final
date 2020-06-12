<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  background-image: url("./assets/night_sky.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;

  min-height: 100vh;
  padding: 25px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: whitesmoke;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
