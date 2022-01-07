<template>

  <div>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Licorice&display=swap" rel="stylesheet">
    </head>
      <div id="nav">
        <h1>Drumre</h1>
        <div></div>
        <div></div>
        <div>
          <router-link to="/">Home</router-link> 
          <router-link :to="{ name: 'Artists' }">Artists</router-link>
          <router-link :to="{ name: 'Profile' }">Profile</router-link>
        </div>
      </div>
  <router-view/>
  </div>
</template>

<style>
html {
  overflow-y: scroll;
}

::-webkit-scrollbar-track {
  background: #1c744c; 
}

::-webkit-scrollbar-thumb {
  background: #1c744c; 
}

::-moz-selection { /* Code for Firefox */
  color: white;
  background: #1c744c;
}

::selection {
  color: white;
  background: #1c744c;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}

#nav {
  border-bottom: 1px solid #235c4277;
  display: flex;
  background: white;
  justify-content: space-around;
  align-items: center;
  height: 8vh;
  width: 100%;
  position: fixed;
  top: 0;

}

#nav h1 {
  font-family: 'Licorice', cursive;
  font-size: 3em;
  color: #42b983;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  margin: 0 5vh;
  color: #2c3e50;
  font-size: 1.2em;
  font-family: 'Mukta', sans-serif;
  text-transform: uppercase;
}

#nav a:hover {
  color: #c7c7c7;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
