<template>
<div v-if="vLogged == true" class="container">
    <div class="header">
        <h1>Top Artists</h1>
        <img style="height: 10vh" src="/pravi.png" alt="headerLogo">
    </div>
    <div class="topArtists">
        <p v-for="(artist, index) in sortedJson" :key="index">
            <router-link :to="{name: 'ArtistDetails', params: { id: artist.idArtist }}">
                <p>{{artist.strArtist}}</p>
            </router-link>
        </p>
    </div>
</div>
<div v-else class="if">
    <h2>Please login first!</h2>
</div>
</template>

<script>
import axios from 'axios';
import json from '../../components/topArtistJson.json'
export default {
    data() {
        return {
            topArtists: json,
            logged: 1,
            vLogged: false
        }
    },
    computed: {
        sortedJson: function() {
            return this.topArtists.sort((t1,t2) => t1.strArtist < t2.strArtist ? -1 : 1);
        },
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
    }
}
</script>

<style>
    .header {
        background: #1c744c;
        height: 10vh;
        padding: 0 5vh;
    }
    .header h1 {
        color: white;
        line-height: 10vh;
    }
    .container {
        margin: 12vh 0;
    }
    .container h1 {
         font-family: 'Questrial', sans-serif;
    }
    .topArtists {
        text-align: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        margin: 5vh;
    }
    .topArtists p {
        padding: 10px;
         font-family: 'Quicksand', sans-serif;
         font-weight: 800;
    }
</style>