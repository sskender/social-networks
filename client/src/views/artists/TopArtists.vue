<template>
<div class="container">
    <h1>Top Artists</h1>
    <div class="topArtists">
        <p v-for="(artist, index) in sortedJson" :key="index">
            {{ artist.strArtist }}
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
    .container {
        margin: 15vh 7vh;
    }
    .container h1 {
        margin-bottom: 7vh;
         font-family: 'Questrial', sans-serif;
         color: #1c744c;
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