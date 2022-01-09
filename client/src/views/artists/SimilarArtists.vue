<template>
<div  v-if="vLogged == true">
  <div v-if="artists">
    <div id="similarHeader" class="header">
        <h1>Similar artists</h1>
        <img style="height: 10vh" src="/pravi.png" alt="headerLogo">
    </div>
    <div class="similarContainer">
        <div v-if="artists">
            <div class="similarArtists">   
            <p v-for="artist in artists" :key="artist.idArtist">
                <router-link :to="{name: 'ArtistDetails', params: { id: artist.idArtist }}">
                    {{artist.strArtist}}
                </router-link>
            </p>
            </div>
        </div>
        <div v-else class="if">
            <h2>Loading..</h2>
        </div>
        </div>
    </div>
  <div v-else class="if">
    <h2>Loading..</h2>
  </div>
</div>
<div v-else class="if">
    <h2>Please login first!</h2>
</div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['id'],
    data() {
    return {
      artists: [],
      logged: 1,
      vLogged: false
      }
  },
  mounted() {
    axios.get(
        'http://localhost:3000/artist/' + this.id + '/similar',
        {
            withCredentials: true
        }
        ).then(response => this.artists = response.data.data),
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
  #similarHeader {
    margin-top: 15vh;
  }
  .similarContainer {
        margin: 12vh auto;
        width: 70%;
        text-align: center;

    }
    .similarContainer h1 {
         font-family: 'Questrial', sans-serif;
         text-align: left;
    }
    .similarArtists {
        column-count: 3;
        margin: 5vh;
    }
    .similarArtists p {
        padding: 10px;
         font-family: 'Quicksand', sans-serif;
         font-weight: 800;
    }
</style>