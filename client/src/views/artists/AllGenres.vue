<template>
<div class="container">
    <div class="header">
        <h1>All Genres</h1>
    </div>
    <div class="genres">
        <div v-for="genre in genres" :key="genre">
            <router-link :to="{name: 'Genre', params: { strGenre: genre }}">
                <p>{{ genre }}</p>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            genres: []
        }
    },
    mounted() {
        axios.get(
        'http://localhost:3000/artist/genre',
        {
            withCredentials: true
        }
        ).then(response => this.genres = response.data.data)
    },
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
    .genres {
        text-align: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        margin: 5vh;
    }
    .genres p {
        padding: 10px;
         font-family: 'Quicksand', sans-serif;
         font-weight: 800;
    }
</style>