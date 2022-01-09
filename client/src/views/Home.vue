<template>
  <div>
  <div v-if="vLogged == true">
    <div class="homeFavorites" v-if="favorites.length">
  <div id="homeHeader" class="header">
                <h1>Artists for you</h1>
            </div>
            
                <div v-if="recommendsLocal.length">
                <div class="profileFavorites">
                    <div v-for="recommendList in recommendsLocal" :key="recommendList">
                        <div v-for="favorite in recommendList.similar" :key="favorite.idArtist">
                        <router-link :to="{name: 'ArtistDetails', params: { id: favorite.idArtist }}">
                            <p>{{ favorite.strArtist }}</p>
                        </router-link>
                    </div>
                    </div>
                    <div v-for="recommendList in recommendsExternal" :key="recommendList">
                        <div v-for="favorite in recommendList.similar" :key="favorite.idArtist">
                        <router-link :to="{name: 'ArtistDetails', params: { id: favorite.idArtist }}">
                            <p>{{ favorite.strArtist }}</p>
                        </router-link>
                    </div>
                    </div>
                </div>
            </div>
            <div v-else class="if2"> <h2>Loading..</h2></div>
            </div>
           
            <div id="noRecom" v-else class="if">
                <h2>Start selecting your favorite artists!</h2>
            </div>
            </div>
            <div v-else class="if2">
              <div class="home">
                <h1>Welcome to DrumCloud!</h1>
                <h3>The best music and artists at one place..</h3>
                <div></div>
                <img src="../assets/home.png" alt="home">
            </div>
            </div>
            <div></div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      favorites: [],
      recommendsLocal: [],
      recommendsExternal: [],
      logged: 1,
      vLogged: false
    }
  },
  mounted() {
     axios.get(
        'http://localhost:3000/user/favorite',
        {
            withCredentials: true
        }
        ).then(response => this.favorites = response.data.data)
        axios.get(
        'http://localhost:3000/user/recommend/local',
        {
            withCredentials: true
        }
        ).then(response => this.recommendsLocal = response.data.data)
        axios.get(
        'http://localhost:3000/user/recommend/external',
        {
            withCredentials: true
        }
        ).then(response => this.recommendsExternal = response.data.data)
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
    }
}
</script>

<style>
  .homeFavorites p {
    font-family: 'Quicksand', sans-serif;
    font-weight: 800;
  }
  #homeHeader {
    margin-top: 15vh;
  }
  #homeHeader h1 {
    font-family: 'Questrial', sans-serif;
  }
  #noRecom {
    margin-top: 0vh;
    margin-bottom: 10vh;
  }
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15vh 0;
    gap: 5vh;
    font-size: 2em;
    font-family: 'Quicksand', sans-serif;
    color: #42b983;
  }

  .home img {
    height: 30vh;
    width: 100%;
    filter: blur(5px);
  }

  .home h3 {
    color: #1c744c;
  }
</style>
