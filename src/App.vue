<template>
  <div id="app">
    <div id="nav">
      <h3 class="logo">Tandem Trivia!!!</h3>
      <div class="links">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#nav {
  background: #fdd9b5;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  /* position: relative; */
}

#nav .logo {
  padding: 20px;
}

#nav .links {
  padding: 20px;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #aaa9ad;
}

body {
  background: #f4f4f4;
}
</style>
