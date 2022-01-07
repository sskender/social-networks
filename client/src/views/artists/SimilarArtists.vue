<template>
  <div v-if="artists">
    <div class="similarContainer">
        <h1>Similar artists</h1>
        <div class="similarArtists">
            <p v-for="artist in artists" :key="artist.idArtist">
            {{artist.strArtist}}
        </p>
        </div>
        
    </div>
  </div>
  <div v-else class="if">
    <h2>Loading..</h2>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['id'],
    data() {
    return {
      artists: []
      }
  },
  mounted() {
    axios.get(
        'http://localhost:3000/artist/' + this.id + '/similar',
        {
            withCredentials: true
        }
        ).then(response => this.artists = response.data.data)
  }
}
</script>

<style>
  .similarContainer {
        margin: 12vh 15vh;
    }
    .similarContainer h1 {
         font-family: 'Questrial', sans-serif;
    }
    .similarArtists {
        column-count: 6;
        margin: 5vh;
    }
    .similarArtists p {
        padding: 10px;
         font-family: 'Quicksand', sans-serif;
         font-weight: 800;
    }
</style>