<template>
 <div v-if="vLogged == true" class="genreContainer">
    <div class="header">
            <h1>{{strGenre}} - All artists</h1>
    </div>
    {{ printAllArtists() }}
    <div v-if="uniqueArtists.length" class="allgenres">
        <div v-for="artist in uniqueArtists" :key="artist.idArtist" class="artists">
            <router-link :to="{name: 'ArtistDetails', params: { id: artist.idArtist }}">
                <p>{{artist.strArtist}}</p>
            </router-link> 
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
    
    props: ['strGenre'],
    data() {
        return {
            artists: [],
            uniqueArtists: [],
            logged: 1,
            vLogged: false
        }
    },
    mounted() {
        if(!this.artists.length) {
            axios.get(
        'http://localhost:3000/artist',
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
        }
},
    methods: {
            printAllArtists() {
                if(this.vLogged==true) {
                    this.artists.forEach(artist => {
                    if(artist.strGenre == this.strGenre) {
                        this.uniqueArtists.push(artist)
                    }
                });
                this.uniqueArtists = [...new Set(this.uniqueArtists)]
                }
            },
        },
        created() {
                axios.get('http://localhost:3000/profile', {withCredentials: true}).then(response => this.logged = response.data.status)
            }
}
</script>

<style>
    .genreContainer {
        margin: 12vh 0;
    }
    .genreContainer h1 {
         font-family: 'Questrial', sans-serif;
    }
    .allgenres {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-auto-rows: 70px;
        gap: 0;
        margin: 5vh;
    }
    .allgenres p {
        padding: 10px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 800;
    }
</style>