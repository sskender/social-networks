<template>

  <div>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Licorice&display=swap" rel="stylesheet">
    </head>
      <div id="nav">
        <h1>DrumCloud</h1>
        <div></div>
        <div></div>
        <div v-if="vLogged == true">
          <router-link to="/">Home</router-link> 
          <router-link :to="{ name: 'Artists' }">Artists</router-link>
          <router-link :to="{ name: 'Profile' }">Profile</router-link>
          <span v-if="vLogged == true">
            <a @click="logout" href="">Logout</a>
          </span>
          <span v-else>
            <a href="http://localhost:3000/auth/facebook">Facebook login</a>
            <a href="http://localhost:3000/auth/twitter/">Twitter login</a>
          </span>
        </div>
        <div v-else>
          <span v-if="vLogged == true">
            <a @click="logout" href="">Logout</a>
          </span>
          <span v-else>
            <a href="http://localhost:3000/auth/facebook">Facebook login</a>
            <a href="http://localhost:3000/auth/twitter/">Twitter login</a>
          </span>
        </div>
      </div>
  <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  
  data() {
    return {
      logged: 1,
      vLogged: false
    }
  },
  methods: {
  },
  mounted() {
    setTimeout(() => {
      if(this.logged == 401) {
        this.vLogged = false 
      } else {
        this.vLogged = true
      }
      
      }, 100
      );
  },
  created() {
    axios.get('http://localhost:3000/profile', {withCredentials: true}).then(response => this.logged = response.data.status)
  },
  methods: {
    logout() {
      axios.get('http://localhost:3000/auth/logout', {withCredentials: true}).then(response => window.location.replace = 'http://localhost:8080/')
    },
  }
}
</script>


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
  font-family: 'Berkshire Swash', cursive;
  font-size: 2em;
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
