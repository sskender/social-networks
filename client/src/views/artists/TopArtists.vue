<template>
<div class="container">
    <div class="header">
        <h1>Top Artists</h1>
    </div>
    <div class="topArtists">
        <p v-for="(artist, index) in sortedJson" :key="index">
            <router-link :to="{name: 'ArtistDetails', params: { id: artist.idArtist }}">
                <p>{{artist.strArtist}}</p>
            </router-link>
        </p>
    </div>
</div>
</template>

<script>
import json from '../../components/topArtistJson.json'
export default {
    data() {
        return {
            topArtists: json
        }
    },
    computed: {
        sortedJson: function() {
            return this.topArtists.sort((t1,t2) => t1.strArtist < t2.strArtist ? -1 : 1);
        },
    }
}
</script>

<style>
    .header {
        background: #1c744cee;
        height: 10vh;
        justify-content: center;
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
        column-count: 6;
        margin: 5vh;
    }
    .topArtists p {
        padding: 10px;
         font-family: 'Quicksand', sans-serif;
         font-weight: 800;
    }
</style>