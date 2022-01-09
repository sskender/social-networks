<template>
 <div class="genreContainer">
    <div class="header">
            <h1 @click="printGenre">{{strGenre}} - All artists</h1>
    </div>
    <div v-if="uniqueArtists" class="allgenres">
        {{ printAllArtists() }}
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

</template>

<script>
import axios from 'axios';
export default {
    
    props: ['strGenre'],
    data() {
        return {
            artists: [],
            uniqueArtists: [],
        }
    },
    mounted() {
        if(!this.artists.length) {
            axios.get(
        'http://localhost:3000/artist',
        {
            withCredentials: true
        }
        ).then(response => this.artists = response.data.data)
        }
},
    methods: {
            printAllArtists() {
                this.artists.forEach(artist => {
                    if(artist.strGenre == this.strGenre) {
                        this.uniqueArtists.push(artist)
                    }
                });
                this.uniqueArtists = [...new Set(this.uniqueArtists)]
            },
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